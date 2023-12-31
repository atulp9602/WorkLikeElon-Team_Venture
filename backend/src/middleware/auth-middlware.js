const jwt = require("jsonwebtoken");
const {STATUS_CODES} = require('../utils/constant');
const { JWT_SECRET } = require("../config/server-config");
const UserRepository = require("../repository/user-repo");

const validateProtectedRoute = async (req, res, next) => {
  try {
        let token = req.header("Authorization");
        if (!token) {
          token = req.params.token;
        }
        if (!token) {
          return res.status(STATUS_CODES.UNAUTHORISED).json({ message: "Token is missing" });
        }
        const verifyToken = jwt.verify(token, JWT_SECRET);
        if (!verifyToken) {
          return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid or expired token" });
        }
        const userRepo = new UserRepository();
        const user = await userRepo.findBy({ email: verifyToken.user.email });
        if (!user) {
          return res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
        }
        req.user = user;
        next();
  } catch (error) {
        if(error.name==='JsonWebTokenError') {
          return res.status(STATUS_CODES.FORBIDDEN).json({message:error.message});
        }
        console.log("Error in protected route", error);
        return res.status(500).json({ message: `Server Error ${error}` });
  }
};

const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordValidator = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

const contactnoValidator = (contactno) => {
  return /^\d{10}$/.test(contactno); //regular expression to check for valid phone number
};

const checkCredentials = (req, res, next) => {
  const route = req.path;
  if (req.params.token) {
    var token = req.params.token;
  }

  switch (route) {
    case `/reset-password/${token}`: {
      const { newpassword } = { ...req.body };
      if (!newpassword) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Password is required" });
      }
      if (!passwordValidator(newpassword)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          message: "Password length should be minimum 8 characters and alpha-numeric characters",
        });
      }
      break;
    }
    case `/change-password`: {
      const { oldpassword, newpassword } = { ...req.body };
      if (!oldpassword || !newpassword) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Old Password and New Passowrd are Required" });
      }
      if (!passwordValidator(oldpassword) || !passwordValidator(newpassword)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          message:
            "Password length should be minimum 8 characters and alpha-numeric characters",
        });
      }
      break;
    }

    case `/user/update-profile`:{
      const {username,contactno} = {...req.body};
      if(!username && !contactno) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({message:'Username or Contact No cannot be empty'});
      }
      if(contactno) {
        if(!contactnoValidator(contactno))
          return res.status(STATUS_CODES.BAD_REQUEST).json({error:"Invalid Phone Number"});
      }
      break;
    }
    case "/forgot-password": {
      const { email } = { ...req.body };
      if (!email) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Email is required" });
      }
      if (!emailValidator(email)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Please enter a valid Email" });
      }
      break;
    }
    case "/signin": {
      const { email, password } = { ...req.body };
      if (!email || !password) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "Email and password are required" });
      }
      if (!emailValidator(email)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Please enter a valid Email Id." });
      } else if (!passwordValidator(password)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid password format" });
      }
      break;
    }
    case "/signup": {
      const { email, contactno, username } = { ...req.body };
      if (!email || !contactno || !username) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Email, contactno or username is required" });
      }
      if (!emailValidator(email)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Enter Valid email" });
      } else if (!contactnoValidator(contactno)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Enter Valid mobile number" });
      }
      break;
    }
    default:
      break;
  }

  // If all required fields are present, continue to the next middleware or route.
  next();
};

module.exports = {
  validateProtectedRoute,
  checkCredentials,
};
