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

const checkCredentials = (req, res, next) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if((!emailRegex.test(req.body.email)||!(passwordRegex.test(req.body.password)))) {
            return res.status(400).json({ error: 'Invalid email or password format' });
        }
        next();
    } catch (error) {
        console.log(`Error in checking credentials`, error )
        return res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = {
    validateProtectedRoute,
    checkCredentials,
}