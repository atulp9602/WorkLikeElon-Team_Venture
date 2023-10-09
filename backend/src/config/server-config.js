const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const connect = async()=>{
    try {
        await mongoose.connect(CONNECTION_URL);   
    } catch (error) {
        console.log("There is an error connecting to mongoDB");
    }
}
module.exports = {
    PORT:process.env.PORT,
    connect,
    JWT_SECRET:process.env.JWT_SECRET,
    EMAIL:process.env.EMAIL,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
}