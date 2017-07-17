var nodemailer = require('nodemailer');

var mailer = {};

mailer.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
         user: 'suladze.sandro@gmail.com',
         pass: 'kukuruku321'
      },
      tls: {
         rejectUnauthorized: false
      }
});

mailer.HelperOption = {
   from: 'Sandro Suladze',
   to: 'sandro.suladze@gmail.com',
   subject: 'My first mail :)',
   text: 'this is amazing'
};




 // transporter.sendMail(HelperOption, function (error, info) {
 //      if(error){
 //         return console.log(error)
 //      }
 //      console.log('Mail has been sent')
 //      console.log(info)
 //   });


module.exports = mailer;

