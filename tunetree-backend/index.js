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
// pull in configuration
require('dotenv').config();
// dependencies
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserService_1 = __importDefault(require("./services/UserService"));
const TuneTreeLogger_1 = __importDefault(require("./util/TuneTreeLogger"));
// initialization
const app = express_1.default();
mongoose_1.default.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const userService = new UserService_1.default(mongoose_1.default);
const tuneTreeLogger = new TuneTreeLogger_1.default();
// dependency middleware
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// SIGN UP
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signupResults = yield userService.createUser(req.body);
    res.status(200).json(signupResults).end();
}));
// SIGN IN
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signinResults = yield userService.signin(req.body);
    res.status(200).json(signinResults).end();
}));
// TEST PROTECTED ENDPOINT
app.post('/protected-endpoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    if (!(yield userService.authenticate(req.body.token))) {
        res.status(401).end();
        return;
    }
    console.log('should only get here if token was valid');
    res.status(200).end();
}));
app.listen(process.env.PORT, () => console.log(`TuneTree api being served at http://localhost:${process.env.PORT}`));
