const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/server-config');
const UserRepository = require('../repository/user-repo');

const validateProtectedRoute = async(req,res,next) => {
    try {
        const token = req.header('Authorization');
        if(!token) {
            return res.status(401).json({error:'Token is missing'});
        }
        const verifyToken = jwt.verify(token,JWT_SECRET);
        if(!verifyToken) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        const userRepo = new UserRepository();
        const user = await userRepo.findBy({email: verifyToken.user.email});
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route", error );
        return res.status(500).json({error:`Server Error ${error}`});
    }
};

module.exports = {
    validateProtectedRoute,
}