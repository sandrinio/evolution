var nodemailer = require('nodemailer');

let mailer = {};

// mailer.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'https://mail.google.com/',
//       port: 587,
//       secure: false, // upgrade later with STARTTLS
//       auth: {
//          user: 'geocell.cc@gmail.com',
//          pass: 'kukuruku123'
//       }
// });

mailer.transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 465,
   secure: true, // use SSL
   auth: {
      user: 'geocell.cc@gmail.com',
      pass: 'kukuruku123'
   }
});

// mailer.HelperOption = {
//    from: 'Sandro Suladze',
//    to: 'sandro.suladze@gmail.com',
//    subject: 'My first mail :)',
//    text: 'this is amazing'
// };



 // transporter.sendMail(HelperOption, function (error, info) {
 //      if(error){
 //         return console.log(error)
 //      }
 //      console.log('Mail has been sent')
 //      console.log(info)
 //   });




module.exports = mailer;
