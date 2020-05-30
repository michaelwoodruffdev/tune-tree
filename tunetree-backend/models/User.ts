import mongoose from 'mongoose';
import { Binary } from 'mongodb';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    passwordHash: String,
    bio: String,
    treesMade: Number,
    contributionsMade: Number,
    followerCount: Number,
    email: String,
    profilePicture: Object
});

interface User {
    username: string;
    passwordHash: string;
    bio: string;
    treesMade: number;
    contributionsMade: number;
    followerCount: number;
    email: string;
    profilePicture: object;
}

export { userSchema, User };