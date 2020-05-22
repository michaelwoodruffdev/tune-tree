const bcrypt = require('bcrypt');
const userSchema = require('../models/User.js');

class UserService {
    constructor(mongoose, jwt) {
        this.mongoose = mongoose;
        this.mongoose.model('Users', userSchema);
        this.Users = this.mongoose.model('Users');
        this.jwt = jwt;
    }

    async createUser(body) {
        const { username, password, email } = body;

        // check if username already exists
        const user = await this.Users.findOne({ username });
        if (user) {
            return null;
        }

        // if not, encrypt password and store in database
        let passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        if (!passwordHash) {
            return null;
        }
        let userToStore = { username, passwordHash, email };
        let newUser = new this.Users(userToStore);
        newUser = await newUser.save();
        return newUser;
    }

    async signin(body) {
        const { username, password } = body;

        // check that user with username exists
        const user = await this.Users.findOne({ username });
        if (!user) {
            return null;
        }

        // if found, compare hash and sign in
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            let token = this.jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
            console.log(`${username} signed in`);
            return token;
        }
        else {
            return null;
        }
    }

    async authenticate(token) {
        try {
            let decoded = await this.jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch(err) {
            return false;
        }
    }
}

module.exports = UserService;