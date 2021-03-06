// pull in configuration
require('dotenv').config();

// dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import UserService from './services/UserService';
import TuneTreeLogger from './util/TuneTreeLogger';

// initialization
const app = express();
mongoose.connect(process.env.MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true });
const userService = new UserService(mongoose);
const tuneTreeLogger = new TuneTreeLogger();

// dependency middleware
app.use(bodyParser.json());
app.use(cors());

// SIGN UP
app.post('/signup', async (req, res) => {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signupResults = await userService.createUser(req.body);
    res.status(200).json(signupResults).end();
});

// SIGN IN
app.post('/signin', async (req, res) => {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signinResults = await userService.signin(req.body);
    res.status(200).json(signinResults).end();
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
