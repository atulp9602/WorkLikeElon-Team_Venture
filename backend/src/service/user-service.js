const UserRepository = require('../repository/user-repo');

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
}

module.exports = UserService;