const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required :true,
    },
    contactno:{
        type : Number,
    }
});

userSchema.pre('save',function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    console.log('encrypted password is ' + encryptedPassword);
    user.password = encryptedPassword;
    next();
});

const User = mongoose.model('User', userSchema,'User');

module.exports = User;