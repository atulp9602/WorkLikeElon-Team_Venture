const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repo');
const {sendEmail} = require('./mail-service');
const {JWT_SECRET} = require('../config/server-config');
const {STATUS_CODES} = require('../utils/constant');

class UserService {
    constructor() {
        this._userRepository = new UserRepository();
    }
    generateToken(user) {
        try {
            return jwt.sign({user}, JWT_SECRET,{expiresIn:'1d'});   
        } catch (error) {
            throw {
                message:error.message,
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            }
        }
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
                throw {
                    statusCode:STATUS_CODES.BAD_REQUEST,
                    message: "Email already exists",
                }
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
            throw ({
                statusCode:error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:error.message
            })
        }
    }

    async signIn(user){
        try {
            const userExists = await this._userRepository.findBy({email: user.email});
            if(!userExists) {
                throw {
                    statusCode:STATUS_CODES.BAD_REQUEST,
                    message: "User does not exist"
                }
            }
            const passwordMatchs = bcrypt.compareSync(user.password,userExists.password);
            // console.log(passwordMatchs);
            console.log("user password is " +user.password + " and userExists is " + userExists.password);
            if (!passwordMatchs) {
                throw {
                    statusCode:STATUS_CODES.BAD_REQUEST,
                    message: 'Invalid credentials',
                }
            }
            const token = this.generateToken(user);

            return token;
        } catch (error) {
            throw ({
                statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    }

    async updatePassword(userId, newpassword,currentPassword = null) {
        try {
            if(currentPassword) {
                const user = await this._userRepository.findBy({_id: userId});
                const passwordMatch = bcrypt.compareSync(currentPassword, user.password);
                if(!passwordMatch) {
                    throw {
                        statusCode:STATUS_CODES.BAD_REQUEST,
                        message:"Invalid Current Password",
                    }
                }
            }
            const result = await this._userRepository.updateOne(userId, {password:newpassword});
            const plainResult = result.toObject();
            delete plainResult.password;
            return plainResult;
        } catch (error) {
            throw ({
                statusCode:error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:error.message,
            })
        }
    }

    async resetPassword(email) {
        try {
            const isUserExist = await this._userRepository.findBy({email:email});
            if(!isUserExist) {
                throw{
                    statusCode:STATUS_CODES.NOT_FOUND,
                    message: `Email ${email} does not exist`
                };

            }
            const token = this.generateToken(isUserExist);
            let url = `http://localhost:3000/reset-password/${token}`;
            // send the link to reset the password in email
            await sendEmail('Reset Password', `Click the following link to change your password ${url}</p>`,email);

            return {message:'Check your email for a link to reset your password.'};
        } catch (error) {
            // throw new Error(error.message);
            throw ({
                statusCode:error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:error.message,
            })
        }
    }

    async updateUserProfile(id,user){
        try {
            const updatedUser=await this._userRepository.updateOne(id,{...user});
            if(!updatedUser) {
                throw {
                    statusCode : STATUS_CODES.NOT_FOUND,
                    message : 'User Not Found',
                }
            }
            const plainUser = updatedUser.toObject();
            delete plainUser.password;
            return plainUser;
        } catch (error) {
            // throw new Error(error.message);
            throw ({
                statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message,
            })
        }
    }    
    async userInfo(userID) {
        try {
            const result = await this._userRepository.findBy({_id:userID});
            if(!result) {
                throw {
                    statusCode:STATUS_CODES.NOT_FOUND,
                    message:'User information could not be found'
                }
            }
            const plainResult = result.toObject();
            delete plainResult.password;
            return plainResult;
        } catch (error) {
            throw ({
                statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    }

}

module.exports = UserService;