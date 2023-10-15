const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {PORT,connect} = require('./config/server-config');
const apiroutes = require('./routes/index');

const app = express();
app.use(cors({origin:'*'}));
app.use(bodyParser.json()); // for parsing application/json
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',apiroutes);

app.listen(PORT,async()=>{
    console.log(`Server is listining on Port: ${PORT}`);
    await connect();
    console.log('mongoDB connected');
});