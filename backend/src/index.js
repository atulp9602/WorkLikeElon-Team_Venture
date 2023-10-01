const express = require('express');
const {PORT,connect} = require('./config/server-config');

const app = express();
// app.use(require("./routes"));
app.listen(PORT,async()=>{
    console.log(`Server is listining on Port: ${PORT}`);
    await connect();
    console.log('mongoDB connected');
});