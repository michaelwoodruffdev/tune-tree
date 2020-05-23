"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.mongoose.model('Users', User_1.userSchema);
        this.Users = this.mongoose.model('Users');
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = body;
            // check if username already exists
            const user = yield this.Users.findOne({ username });
            if (user) {
                return null;
            }
            // if not, encrypt password and store in database
            let passwordHash = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
            if (!passwordHash) {
                return null;
            }
            let userToStore = { username, passwordHash, email };
            let newUser = new this.Users(userToStore);
            newUser = yield newUser.save();
            return newUser;
        });
    }
    signin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = body;
            // check that user with username exists
            const user = yield this.Users.findOne({ username });
            if (!user) {
                return null;
            }
            // if found, compare hash and sign in
            const match = yield bcrypt_1.default.compare(password, user.passwordHash);
            if (match) {
                let token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
                console.log(`${username} signed in`);
                return token;
            }
            else {
                return null;
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
