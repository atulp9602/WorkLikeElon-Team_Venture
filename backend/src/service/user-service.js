const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repo');
const {sendEmail} = require('./mail-service');
const {JWT_SECRET} = require('../config/server-config');

class UserService {
    constructor() {
        this._userRepository = new UserRepository();
    }
    generateToken(user) {
        return jwt.sign({user}, JWT_SECRET,{expiresIn:'1d'});
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
            const userExists = await this._userRepository.findBy({email: user.email});
            if(userExists) {
                throw Error("Email already exists",);
            }
            const password = this.generateAlphanumericPassword(8);
            user.password = password;
            const response = await this._userRepository.createOne(user);
            const token = this.generateToken(user);
            let url = `http://localhost:3000/create-password/${token}`;
            // Send email to the newly created account with a temporary password
            await sendEmail('Temp Password', `<p>Your password is: ${password}.<br>Click the following link to change your password:${url}</p>`,user.email);
            const plainresult = response.toObject();
            delete plainresult.password;

            return plainresult;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(user){
        try {
            const userExists = await this._userRepository.findBy({email: user.email});
            if(!userExists) {
                throw new Error(`User ${user.email} does not exist`);
            }
            const passwordMatchs = bcrypt.compareSync(user.password,userExists.password);
            console.log(passwordMatchs);
            if (!passwordMatchs) {
                throw new Error("Invalid credentials");
            }
            const token = this.generateToken(user);

            return token;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async updatePassword(userId, newpassword,currentPassword = null) {
        try {
            if(currentPassword) {
                const user = await this._userRepository.findBy({_id: userId});
                const passwordMatch = bcrypt.compareSync(currentPassword, user.password);
                if(!passwordMatch) {
                    throw new Error("Invalid current password");
                }
            }
            const result = await this._userRepository.updateOne(userId, {password:newpassword});
            const plainResult = result.toObject();
            delete plainResult.password;
            return plainResult;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async resetPassword(email) {
        try {
            const isUserExist = await this._userRepository.findBy({email:email});
            if(!isUserExist) {
                throw new Error(`${email} doesn't exists`) ;
            }
            const token = this.generateToken(isUserExist);
            let url = `http://localhost:3000/reset-password/${token}`;
            // send the link to reset the password in email
            await sendEmail('Reset Password', `Click the following link to change your password ${url}</p>`,email);

            return {'msg':'Check your email for a link to reset your password.'};
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateUserProfile(id,user){
        try {
            const updatedUser=await this._userRepository.updateOne(id,{...user});
            if(!updatedUser) {
                throw new Error('User not found');
            }
            const plainUser = updatedUser.toObject();
            delete plainUser.password;
            return plainUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }    
    async userInfo(userID) {
        try {
            const result = await this._userRepository.findBy({_id:userID});
            const plainResult = result.toObject();
            delete plainResult.password;
            return plainResult;
        } catch (error) {
            throw new Error(error.message);   
        }
    }

}

module.exports = UserService;