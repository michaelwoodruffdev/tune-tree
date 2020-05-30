import mongoose from 'mongoose';
import { Binary } from 'mongodb';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    passwordHash: String,
    email: String,
    profilePicture: Object
});

interface User {
    username: string;
    passwordHash: string;
    email: string;
    profilePicture: object;
}

export { userSchema, User };