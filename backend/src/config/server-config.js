const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const connect = ()=>{
    mongoose.connect('mongodb://localhost:27017/todoapp_db');
}
module.exports = {
    PORT:process.env.PORT,
    connect,
}