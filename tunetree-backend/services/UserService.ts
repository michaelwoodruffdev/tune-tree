import bcrypt from 'bcrypt';
import { userSchema, User } from '../models/User';
import { Mongoose } from 'mongoose';
import jwt from 'jsonwebtoken';

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
        let userToStore: User = { username, passwordHash, email };
        let newUser = new this.Users(userToStore);
        newUser = await newUser.save();
        return newUser;
    }

    async signin(body: { username: string, password: string }) {
        const { username, password } = body;

        // check that user with username exists
        const user = await this.Users.findOne({ username });
        if (!user) {
            return null;
        }

        // if found, compare hash and sign in
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            let token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '2h' });
            console.log(`${username} signed in`);
            return token;
        }
        else {
            return null;
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