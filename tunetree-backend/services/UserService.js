"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_validator_1 = __importDefault(require("email-validator"));
const userRegex = RegExp(process.env.USER_REGEX);
const passwordRegex = RegExp(process.env.PASSWORD_REGEX);
class UserService {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.mongoose.model('Users', User_1.userSchema);
        this.Users = this.mongoose.model('Users');
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    error: 'Invalid username. Usernames should be at least 6 characters long, and contain no white space.'
                };
            }
            if (!passwordRegex.test(password)) {
                return {
                    newUser: null,
                    error: 'Invalid password. Passwords should be at least 8 characters long, and should contain at least 1 letter and number'
                };
            }
            ;
            // for now, we'll leave it at this, this doesn't check if an email exists, apparently, the 'email-existance' library can when I need to implement that
            if (!email_validator_1.default.validate(email)) {
                return {
                    newUser: null,
                    error: 'Invalid email'
                };
            }
            // check if username or email already exists
            let testDuplicateUser = yield this.Users.findOne({ username });
            if (testDuplicateUser) {
                return {
                    newUser: null,
                    error: 'User with that username already exists'
                };
            }
            testDuplicateUser = yield this.Users.findOne({ email });
            if (testDuplicateUser) {
                return {
                    newUser: null,
                    error: 'User with that email already exists'
                };
            }
            // if everything passes, encrypt password and store in database
            let passwordHash = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
            if (!passwordHash) {
                return {
                    newUser: null,
                    error: 'Server error'
                };
            }
            let userToStore = { username, passwordHash, email };
            let newUser = new this.Users(userToStore);
            newUser = yield newUser.save();
            return {
                newUser: newUser,
                error: null
            };
        });
    }
    signin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = body;
            // check that user with username exists
            let user = yield this.Users.findOne({ username });
            if (!user) {
                user = yield this.Users.findOne({ "email": username });
            }
            if (!user) {
                return {
                    token: null,
                    error: 'Invalid username or email'
                };
            }
            // if found, compare hash and sign in
            const match = yield bcrypt_1.default.compare(password, user.passwordHash);
            if (match) {
                let token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
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
        });
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let decoded = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
}
exports.default = UserService;
