// base initialization
const express = require('express');
const app = express();
const port = 3000;

// dependencies
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// mongodb info
const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27017';
const dbName = 'tunetree';
const userBaseCollectionName = 'userbase';

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('TuneTree'));

app.post('/signup', (req, res) => {
    console.log(`${req.ip} (${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}): /signup`);

    // connect to userbase
    MongoClient.connect(mongourl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }

        const tuneTreeDB = client.db(dbName);

        tuneTreeDB.collection(userBaseCollectionName, (err, userBase) => {
            if (err) {
                console.log(err);
                res.status(500).end();
                return;
            }

            // check if user already exists
            userBase.find({ "username": req.body.username }).toArray((err, usersFound) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                    return;
                }
                if (usersFound.length !== 0) {
                    console.log(`ERROR (signup): ${req.body.username} already exists`);
                    res.status(409).end();
                    return;
                }

                // if not, hash plain text password and store user
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }
                    let userToInsert = {
                        username: req.body.username, 
                        password: hash
                    }
                    userBase.insertOne(userToInsert);
                    res.status(200).end();
                });
            });
        });
    });
});

app.listen(port, () => console.log(`TuneTree api being served at http://localhost:${port}`));
