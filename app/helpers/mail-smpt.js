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
  console.log('email')
  const data = await transporter.sendMail( mailData );
  return data;
}

async function sendUpdateConfirmationEmail( name, email, code ) {
  const activationLink = `http://localhost:3000/api/v1/users/confirmation?code=${ code }`;
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: '[HDC] Confirm your email at Hunky Dory Code.',
    text: `Hi ${ name }, we saw that you update your email recently, confirm your changes here: ${ activationLink }`,
    html: `Hi ${ name }, we saw that you update your email recently, confirm changes here <a href='${ activationLink }'>active it here</a>`,
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
async function sendSuccessfulUpdateEmail( name, email ) {
    const mailData = {
      from: SMTP_USER,
      to: email,
      subject: '[HDC] - Your changes were successfully saved!',
      text: `Hi ${ name },\n thank you for your confirmation, your changes has been successfully saved.
      Hunky Dory Code`,
      html: `<h1>Hi ${ name },</h1> thank you for your confirmation, your changes has been successfully saved.
      <h1>Hunky Dory Code</h1>`,
    };
  
    const data = await transporter.sendMail( mailData );
    return data;
}

module.exports = {
    sendRegisterEmail,
    sendSuccessfulActivationEmail,
    sendUpdateConfirmationEmail,
    sendSuccessfulUpdateEmail,

};