var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourEmail@gmail.com',
    pass: 'asdgaasdf'
  }
});

module.exports = transporter;