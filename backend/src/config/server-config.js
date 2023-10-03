const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const connect = async()=>{
    await mongoose.connect(CONNECTION_URL);
}
module.exports = {
    PORT:process.env.PORT,
    connect,
    JWT_SECRET:process.env.JWT_SECRET,
}