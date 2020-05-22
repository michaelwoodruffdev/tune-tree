// pull in configuration
require('dotenv').config();


// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const UserService = require('./services/UserService.js');
const cors = require('cors');
const mongoose = require('mongoose');


// initialization
const app = express();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const userService = new UserService(mongoose, jwt);

// dependency middleware
app.use(bodyParser.json());
app.use(cors());

// SIGN UP
app.post('/signup', async (req, res) => {
    console.log(`${req.ip} (${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}): /signup`);

    let newUser = await userService.createUser(req.body);
    if (newUser) {
        res.status(200).end();
        return;
    }
    else {
        res.status(500).end();
        return;
    }
});

// SIGN IN
app.post('/signin', async (req, res) => {
    console.log(`${req.ip} (${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}): /signin`);

    let token = await userService.signin(req.body);
    if (token) {
        res.status(200).json({ token }).end();
    }
    else {
        res.status(401).end();
    }
});

// TEST PROTECTED ENDPOINT
app.post('/protected-endpoint', async (req, res) => {
    if (!(await userService.authenticate(req.body.token))) {
        res.status(401).end();
        return;
    }

    console.log('should only get here if token was valid');
    res.status(200).end();
});

app.listen(process.env.PORT, () => console.log(`TuneTree api being served at http://localhost:${process.env.PORT}`));
