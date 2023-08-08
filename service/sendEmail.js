const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD, META_EMAIL} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2255
    secure: true,
    auth: {
        user: META_EMAIL,
        pass: META_PASSWORD,
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data) => {
    try {
        const email = {...data, from: META_EMAIL}
        await transporter.sendMail(email);
        return true
    } catch (error) {
        throw error
    }
}

module.exports = sendEmail