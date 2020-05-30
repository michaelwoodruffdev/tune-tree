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
// pull in configuration
require('dotenv').config();
// dependencies
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserService_1 = __importDefault(require("./services/UserService"));
const TuneTreeLogger_1 = __importDefault(require("./util/TuneTreeLogger"));
// initialization
const app = express_1.default();
mongoose_1.default.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const userService = new UserService_1.default(mongoose_1.default);
const tuneTreeLogger = new TuneTreeLogger_1.default();
// dependency middleware
app.use(body_parser_1.default.json());
app.use(cors_1.default({ origin: 'http://localhost:8080', credentials: true }));
app.use(express_fileupload_1.default());
app.use(cookie_parser_1.default());
// SIGN UP
app.post('/signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signupResults = yield userService.createUser(req.body);
    res.status(200).json(signupResults).end();
}));
// SIGN IN
app.post('/signin', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    console.log('hello?');
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let signinResults = yield userService.signin(req.body);
    if (!signinResults.error) {
        console.log('sending cookie');
        res.cookie('tunetreeToken', signinResults.token, { httpOnly: true });
    }
    delete signinResults.token;
    res.status(200).json(signinResults).end();
}));
app.post('/update-profile-picture', (req, res) => __awaiter(this, void 0, void 0, function* () {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    let decodedToken = Object(yield userService.authenticate(req.cookies.tunetreeToken));
    if (!decodedToken) {
        res.status(401).json({ error: 'Invalid Credentials' }).end();
        return;
    }
    console.log(req.files.imageData);
    let updateResults = userService.updateProfileImage({ username: decodedToken.username, imageData: req.files.imageData });
    res.status(200).json(updateResults).end();
}));
// TEST PROTECTED ENDPOINT
app.post('/protected-endpoint', (req, res) => __awaiter(this, void 0, void 0, function* () {
    tuneTreeLogger.logRequest(new Date(), req.ip, req.path);
    if (!(yield userService.authenticate(req.body.token))) {
        res.status(401).end();
        return;
    }
    console.log('should only get here if token was valid');
    res.status(200).end();
}));
app.listen(process.env.PORT, () => console.log(`TuneTree api being served at http://localhost:${process.env.PORT}`));
