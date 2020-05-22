const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String, 
    passwordHash: String, 
    email: String
});

module.exports = userSchema;