const express = require('express');
const nodemailer = require('nodemailer');
const routes=express.Router()

routes.get('/', async (req, resp) => {
  const {email}=req.body;
console.log(email)
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: '587',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to:   {email},
    subject: "Twix mailer",
    html: 'Hello ' + '<b>' + 'deechris27' + '<br>Thank You for contacting'
  };

  let sendMail = await transporter.sendMail(mailOptions);
  console.log("twix email.....", sendMail.response);
});

module.exports=routes;