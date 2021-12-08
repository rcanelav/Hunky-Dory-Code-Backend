'use strict';
const nodemailer = require('nodemailer');
const {
    SMTP_PORT,
    SMTP_HOST,
    SMTP_USER,
    SMTP_PASS,
} = process.env;
  
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, 
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

async function sendRegisterEmail( name, email, code ) {
  const activationLink = `http://localhost:3000/api/v1/users/activation?code=${ code }`;
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: '[HDC] Welcome to Hunky Dory Code.',
    text: `Hi ${ name }, to confirm the account go this link: ${ activationLink }`,
    html: `Hi ${ name }, to confirm the account <a href='${ activationLink }'>active it here</a>`,
  };

  const data = await transporter.sendMail( mailData );
  return data;
}

async function sendSuccessfulActivationEmail( name, email ) {
    const mailData = {
      from: SMTP_USER,
      to: email,
      subject: '[HDC] - Account activated!',
      text: `Hi ${ name },\n your account was activated.`,
      html: `<h1>Hi ${ name },</h1> your account was activated.`,
    };
  
    const data = await transporter.sendMail( mailData );
    return data;
}

module.exports = {
    sendRegisterEmail,
    sendSuccessfulActivationEmail,

};