const sender = require('../config/email-config');
const {EMAIL,EMAIL_PASSWORD} = require('../config/server-config');

const sendEmail = async(subject,data,email) => {
    try {
        const options = {
            subject: subject,
            from: EMAIL,
            to: email,
            html:`<h2>${data}</h2>`,
        };
        const response = await sender.sendMail(options);

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    sendEmail,
}