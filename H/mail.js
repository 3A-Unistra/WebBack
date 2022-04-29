const {promisify} = require("es6-promisify")
const nodemailer = require ("nodemailer");
const crypto =require("crypto");
var models = require('../models');
const { text } = require("body-parser");
require('dotenv').config(); // pour accéder au .env

const transport = nodemailer.createTransport({
    service: 'gmail', 
    auth:{
        user: 'strasspoly@gmail.com',
        pass: "strasspoly123"
        }
});

exports.send = async (option)=>{
    const mailOptions = {
        from : 'strasspoly@gmail.com',
        subject : option.subject,
        to : option.users.email,
        html:option.html,
        text:option.text
    };
    return transport.sendMail(mailOptions);
};
