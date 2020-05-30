// pull in configuration
require('dotenv').config();

// dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import UserService from './services/UserService';
import TuneTreeLogger from './util/TuneTreeLogger';
import { sign } from 'crypto';

// initialization
const app = express();
mongoose.connect(process.env.MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true });
const userService = new UserService(mongoose);
const tuneTreeLogger = new TuneTreeLogger();

// dependency middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(fileupload());
app.use(cookieParser());

// SIGN UP
app.post('/signup', async (req, res) => {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signupResults = await userService.createUser(req.body);
    res.status(200).json(signupResults).end();
});

// SIGN IN
app.post('/signin', async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    console.log('hello?');
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signinResults = await userService.signin(req.body);
    if (!signinResults.error) {
        console.log('sending cookie');
        res.cookie('tunetreeToken', signinResults.token, { httpOnly: true });
    }
    delete signinResults.token;
    res.status(200).json(signinResults).end();
});

app.post('/update-profile-picture', async (req, res) => {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let decodedToken = Object(await userService.authenticate(req.cookies.tunetreeToken));
    if (!decodedToken) {
        res.status(401).json({ error: 'Invalid Credentials' }).end();
        return;
    }
    console.log(req.files!.imageData);
    let updateResults = userService.updateProfilePicture({ username: decodedToken.username, imageData: req.files!.imageData });
    res.status(200).json(updateResults).end();
});

app.post('/get-profile-picture', async (req, res) => {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    console.log(req.body);
    let imageResults = await userService.getProfilePicture(req.body);
    console.log('image results');
    console.log(imageResults);
    res.status(200).json(imageResults).end();
});

// TEST PROTECTED ENDPOINT
app.post('/protected-endpoint', async (req, res) => {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    if (!(await userService.authenticate(req.body.token))) {
        res.status(401).end();
        return;
    }
    console.log('should only get here if token was valid');
    res.status(200).end();
});

app.listen(process.env.PORT, () => console.log(`TuneTree api being served at http://localhost:${process.env.PORT}`));
