const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repo');
const {sendEmail} = require('./mail-service');
const {JWT_SECRET} = require('../config/server-config');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    generateRandomPassword(length) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    
    generateAlphanumericPassword(minLength) {
        let password = this.generateRandomPassword(minLength);
        while (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            password = this.generateRandomPassword(minLength);
        }
        return password;
    }

    async createUser(user) {
        try {
            const userExists = await this.userRepository.findBy({email: user.email});
            if(userExists) {
                throw Error("Email already exists",);
            }
            const password = this.generateAlphanumericPassword(8);
            user.password = password;
            const response = await this.userRepository.createOne(user);
            // Send email to the newly created account with a temporary password
            await sendEmail('Temp Password', `<p>Hi, your temp password is :${password}</p>`,user.email);
            console.log(user.email);
            return { username: response.username, email: response.email, _id: response._id };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(user){
        try {
            const userExists = await this.userRepository.findBy({email: user.email});
            if(!userExists) {
                throw new Error(`User ${user.email} does not exist`);
            }
            const passwordMatchs = bcrypt.compareSync(user.password,userExists.password);
            if (!passwordMatchs) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({user},JWT_SECRET,{expiresIn:'1d'});

            return token;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async userInfo(userID) {
        try {
            const userData = await this.userRepository.findBy({_id:userID});

            return {_id: userData._id,username: userData.username,email: userData.email};
        } catch (error) {
            throw new Error(error.message);   
        }
    }
}

module.exports = UserService;