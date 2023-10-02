const UserService = require('../service/user-service');

const userService = new UserService();
module.exports = {
    async signUp(req, res) {
        try {
            const {username,email,password} = {...req.body};
            const user = await userService.createUser({username, email, password});

            return res.status(201).json({
                success:true,
                data:user,
                message: 'User created successfully',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                data:{},
                message: 'There is an error for creating the user',
                error:error.message,
            });
        }
    },

    async signIn(req,res) {
        try {
            const {email,password} = {...req.body};
            const response = await userService.signIn({email,password});

            return res.status(200).json({
                success:true,
                token:response,
                message: 'User loggedIn successfully',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                data:{},
                message: 'There is an error in user signin',
                error:error.message,
            });
        }
    },

    async userInfo(req,res){
        try {
            const userId = req.user.id;
            console.log(userId);
            const response = await userService.userInfo(userId);

            return res.status(200).json({
                sucess:true,
                data:response,
                message: 'Successfully fetched user info',
                error: {},
            })
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                data:{},
                message:'Error while fetching user information',
                error: error.message
            })
        }
    }
}
                