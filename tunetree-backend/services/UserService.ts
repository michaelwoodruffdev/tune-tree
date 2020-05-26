require('dotenv').config();

import bcrypt from 'bcrypt';
import { userSchema, User } from '../models/User';
import { Mongoose } from 'mongoose';
import jwt from 'jsonwebtoken';
import EmailValidator from 'email-validator';

const userRegex = RegExp(process.env.USER_REGEX!);
const passwordRegex = RegExp(process.env.PASSWORD_REGEX!);

class UserService {
    mongoose: Mongoose;
    Users: any;

    constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
        this.mongoose.model('Users', userSchema);
        this.Users = this.mongoose.model('Users');
    }

    async createUser(body: { username: string, password: string, email: string }) {
        const { username, password, email } = body;

        // check valid username, password, and email
        if (username === '' || password === '' || email === '') {
            return {
                newUser: null,
                error: 'Empty fields detected'
            };
        }
        if (!userRegex.test(username)) {
            return {
                newUser: null,
                error: 'Invalid username. Usernames should be 6-255 characters long, and contain no white space.'
            };
        }
        if (!passwordRegex.test(password)) {
            return {
                newUser: null,
                error: 'Invalid password. Passwords should be 8-255 characters, contain at least 1 digit, and contain at least 1 special character.'
            };
        };
        // for now, we'll leave it at this, this doesn't check if an email exists, apparently, the 'email-existance' library can when I need to implement that
        if (!EmailValidator.validate(email)) {
            return {
                newUser: null,
                error: 'Invalid email'
            };
        }

        // check if username or email already exists
        let testDuplicateUser = await this.Users.findOne({ username });
        if (testDuplicateUser) {
            return {
                newUser: null,
                error: 'User with that username already exists'
            };
        }
        testDuplicateUser = await this.Users.findOne({ email });
        if (testDuplicateUser) {
            return {
                newUser: null,
                error: 'User with that email already exists'
            };
        }

        // if everything passes, encrypt password and store in database
        let passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        if (!passwordHash) {
            return {
                newUser: null,
                error: 'Server error'
            };
        }

        let userToStore: User = { username, passwordHash, email };
        let newUser = new this.Users(userToStore);
        newUser = await newUser.save();
        return {
            newUser: newUser,
            error: null
        };
    }

    async signin(body: { username: string, password: string }) {
        const { username, password } = body;

        // check that user with username exists
        let user = await this.Users.findOne({ username });
        if (!user) {
            user = await this.Users.findOne({ "email": username });
        }
        if (!user) {
            return {
                token: null, 
                error: 'Invalid username or email'
            };
        }

        // if found, compare hash and sign in
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            let token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '2h' });
            console.log(`${username} signed in`);
            return {
                token, 
                error: null
            };
        }
        else {
            return {
                token: null, 
                error: 'Invalid password'
            };
        }
    }

    async authenticate(token: string) {
        try {
            let decoded = await jwt.verify(token, process.env.JWT_SECRET!);
            return true;
        } catch (err) {
            return false;
        }
    }
}

export default UserService;