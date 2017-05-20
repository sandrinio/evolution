var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Eva = require('../models/evolution');
var middleware = require('../middleware');


router.get('/profile', middleware.isLoggedIn, function (req, res) {
  Eva.find({'author.fullname': req.user.fullname}).sort('-date').exec(function (err, eval) {
    if(err){
      return console.log(err)
    }
    res.render('auth/profile', { evaluations: eval,
                                 page_name: 'profile'
                                 })
  });
});

router.post('/pass-change', middleware.isLoggedIn, function (req, res) {
  req.user.setPassword(req.body.password, function (err, success) {
    if(err){
      res.send(err)
    }else{
      success.save();
      console.log(success);
      res.redirect('back')
    }
  });
});

router.put('/mob-change', middleware.isLoggedIn, function (req, res) {
   User.findByIdAndUpdate(req.user.id, req.body.user, function (err, user) {
     if(err){
       console.log(err)
     }else{
       res.redirect('back')
     }
   })
});



module.exports = router;