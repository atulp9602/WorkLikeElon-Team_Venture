const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repo');
const {JWT_SECRET} = require('../config/server-config');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async createUser(user) {
        try {
            const response = await this.userRepository.createOne(user);
            
            return { username: response.username, email: response.email, _id: response._id };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(user){
        try {
            const userExists = await this.userRepository.findBy({email: user.email});
            console.log(userExists);
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
}

module.exports = UserService;