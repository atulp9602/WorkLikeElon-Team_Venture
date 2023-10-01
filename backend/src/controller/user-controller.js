const UserService = require('../service/user-service');

const userService = new UserService();
module.exports = {
    async create(req, res) {
        try {
            const {username,email,password} = {...req.body};
            const user = await userService.createUser({username, email, password});

            return res.status(200).json({
                success:true,
                data:user,
                message: 'User created successfully',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success:true,
                data:{},
                message: 'There is an error for creating the user',
                error:error,
            });
        }
    }
}
                