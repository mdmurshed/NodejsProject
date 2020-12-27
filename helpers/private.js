var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mdmurshedulhoque1111@gmail.com',
    pass: 'asdgaasdf'
  }
});

module.exports = transporter;