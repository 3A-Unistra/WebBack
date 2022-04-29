const {promisify} = require("es6-promisify")
const nodemailer = require ("nodemailer");
const crypto =require("crypto");
var models = require('../models');
const { text } = require("body-parser");
require('dotenv').config(); // pour accéder au .env

const transport = nodemailer.createTransport({
    service: process.env.SERVICE_EMAIL, 
    auth:{
        user: process.env.ADRESS_EMAIL,
        pass: process.env.PASSWORD_EMAIL
        }
});

exports.send = async (option)=>{
    const mailOptions = {
        from : process.env.ADRESS_EMAIL,
        subject : option.subject,
        to : option.users.email,
        html:option.html,
        text:option.text
    };
    return transport.sendMail(mailOptions);
};
