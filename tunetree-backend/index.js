// pull in configuration
const config = require('./config.json');

// base initialization
const express = require('express');
const app = express();

// dependencies
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(session({ 
    secret: config.secret, 
    resave: true, 
    saveUninitialized: true, 
    store: new MemoryStore({
        checkPeriod: 86400000
    }), 
    unset: 'keep'
}));

app.get('/', (req, res) => res.send('TuneTree'));

app.post('/signup', (req, res) => {

    // non asynchronous version (but more readable)
    // const client = await MongoClient.connect(mongourl, { useUnifiedTopology: true });
    // const tuneTreeDB = client.db(dbName);
    // const userBase = tuneTreeDB.collection(userBaseCollectionName);
    // const userFound = await userBase.findOne({ 'username': req.body.username });
    // if (userFound != null) {
    //     console.log(`ERROR (signup): ${req.body.username} already exists`);
    //     res.status(409).end();
    //     return;
    // }
    // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // let userToInsert = {
    //     username: req.body.username,
    //     password: hash
    // }
    // userBase.insertOne(userToInsert);
    // res.status(200).end();

    console.log(`${req.ip} (${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}): /signup`);

    // connect to database
    MongoClient.connect(config.mongourl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }

        const tuneTreeDB = client.db(config.dbName);

        tuneTreeDB.collection(config.userBaseCollectionName, (err, userBase) => {
            if (err) {
                console.log(err);
                res.status(500).end();
                return;
            }

            // check if user already exists
            userBase.find({ 'username': req.body.username }).toArray((err, usersFound) => {
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
                bcrypt.hash(req.body.password, config.saltRounds, (err, hash) => {
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

app.post('/signin', (req, res) => {
    console.log(`${req.ip} (${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}): /signin`);

    // connect to userbase
    MongoClient.connect(config.mongourl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }

        const tuneTreeDB = client.db(config.dbName);

        tuneTreeDB.collection(config.userBaseCollectionName, (err, userBase) => {
            if (err) {
                console.log(err);
                res.status(500).end();
                return;
            }


            // find user by username
            userBase.findOne({ 'username': req.body.username }, (err, userFound) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                    return;
                }
                if (userFound == null) {
                    console.log(`ERROR (signin): ${req.body.username} not found in db`);
                    res.status(404).end();
                    return;
                }


                // compare hashed password
                bcrypt.compare(req.body.password, userFound.password, (err, match) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }
                    if (!match) {
                        console.log(`ERROR (signin): password for ${req.body.username} didn't match`);
                        res.status(401).end();
                        return;
                    }
                    else {
                        // success (this is where JWT will handle signin)
                        // this is insecure, vulrenable to XSS even if stored in httpOnly cookie, should use express-session
                        // jwt.sign({ username: req.body.username }, config.secret, { expiresIn: '2h' }, (err, token) => {
                        //     if (err) {
                        //         console.log(err);
                        //         res.status(500).end();
                        //         return;
                        //     }
                        //     console.log(`${req.body.username} signed in`);
                        //     res.status(200).json({ username: req.body.username, token: token }).end();
                        //     return;
                        // });
                        req.session.username = req.body.username;
                        console.log(req.session);
                        req.session.save((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(200).json({ username: req.body.username }).end();
                        return;
                    }
                });
            })
        });
    });
});

// authentication middleware (assuming token was sent in request body)
// const authenticate = (req, res, next) => {
//     jwt.verify(req.body.token, config.secret, (err, decoded) => {
//         if (decoded == null) {
//             res.status(401).end();
//             return;
//         }
//         else {
//             next();
//         }
//     });
// };

const authenticate = (req, res, next) => {
    req.session.reload((err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(req.session);
    if (!req.session.username) {
        res.status(401).end();
        return;
    }
    else {
        next();
    }
}

app.post('/protected-endpoint', authenticate, (req, res) => {
    console.log('should only get here if token was valid');
    res.status(200).end();
});

app.post('/session-test', authenticate, (req, res) => {
    res.json({ username: req.session.username }).status(200).end();
    return;
});

app.listen(config.port, () => console.log(`TuneTree api being served at http://localhost:${config.port}`));
