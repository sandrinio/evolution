var nodemailer = require('nodemailer');

var mailer = {};

mailer.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
         type: 'OAuth2',
         user: 'geocell.cc@gmail.com',
         clientId: '116741831378651784831',
         clientSecret: '4/ec8Wyzap3IHxp9Uflj7rTf2ll8B7UtVjSROuxDW7JSo',
         refreshToken: '1/lhNo_Kw12r88bjkDvbd2ZeurdxwqlnSgAjZqvOb53lk',
         accessToken: 'ya29.GlulBIBPjBc9GfbyPeINNLPIZYFmnGBmUyHyzMQ__XiFz8CdEwHEbGDZhKlhQxSl4uykcWnqcb8Mpoa-skL09MMjuGmg74LRzrqCDpt1C2RQDQWZpjdxguzOFU6Z',
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
