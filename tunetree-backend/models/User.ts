import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String, 
    passwordHash: String, 
    email: String
});

interface User {
    username: string;
    passwordHash: string;
    email: string;
}

// module.exports = userSchema;
export { userSchema, User };