const nodemailer = require('nodemailer');
const {EMAIL,EMAIL_PASSWORD} = require('./server-config');

const sender = nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user:EMAIL,
        pass:EMAIL_PASSWORD,
    }
});

module.exports = sender;