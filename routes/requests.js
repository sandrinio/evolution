var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
let Post = require('../models/post');
var mailer = require('../middleware/mails');

router.get('/request', middleware.isLoggedIn, (req, res) => {
    Post.find({'status': '' || 'Unsolved' || 'undefined'}).sort('-date').exec(function (err, reqsContent){
        if(err){
            return console.log(err)
        }
    
            res.render('requests/reqs', {
                                          page_name: 'reqs',
                                          reqsContent: reqsContent  
                                        });
    });
});


router.get('/post/:id/edit', function (req, res) {
   Post.findById(req.params.id, function (err, result) {
      if(err){
         req.flash('Error', err);
         console.log(err)
      }else{
         res.render('requests/edit', {
            result: result,
            page_name: 'none'
         })
      }
   })

});

router.put('/request/:id/edit', function (req, res) {
   Post.findByIdAndUpdate(req.params.id, req.body.nPost, function (err, result) {
      if(err){
         console.log(err)
      }else{
         var Options = {
            from: 'Sandro Suladze',
            to: 'sandro.suladze@gmail.com',
            subject: result.title,
            html: result.content
         };
         mailer.transporter.sendMail(Options, function (err, info) {
            if(error){
               return console.log(error)
            }
            console.log('Mail has been sent');
            console.log(info)
         });
         res.redirect('/home/show/' + req.params.id)
      }
   })
});

module.exports = router;