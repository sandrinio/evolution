var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Eva = require('../models/evolution');
var middleware = require('../middleware');
var multer  = require('multer');
var path = require('path');



var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/uploads/userPictures/');
   },
   filename: function (req, file, cb) {
      cb(null, req.user.firstname + req.user.lastname + path.extname(file.originalname));
   }
});
var upload = multer({ storage: storage });

router.get('/profile', middleware.isLoggedIn, function (req, res) {
  User.find({}).sort('-date').exec(function (err, user) {
    if(err){
      return console.log(err)
    }
    res.render('auth/profile', { user: user,
                                 page_name: 'profile'
                                 })
  });
});

router.get('/userdetales/:id', function (req, res) {
   User.findById(req.params.id, function (err, user) {
      if(err){
         return req.flash('error', err)
      }
      res.render('auth/show', {
         page_name: 'none',
         user: user
      })
   })
});

router.post('/pass-change', middleware.isLoggedIn, function (req, res) {
  req.user.setPassword(req.body.password, function (err, success) {
    if(err){
      console.log(err)
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

router.put("/avatar", upload.single('user[pic]'), function (req, res) {
   var pic = ({pic: req.file.filename});
   User.findByIdAndUpdate(req.user.id, pic, function (err, userPic) {
      if(err){
         console.log(err);
         req.flash('error', err);
         res.redirect("back")
      }else{
         req.flash('success', 'სურათი ატვირთულია');
         res.redirect("back")
      }
   });
});

router.put('/user/:id/update', function (req, res) {
   User.findByIdAndUpdate(req.params.id, req.body.userInfo, function (err, updated) {
      if(err){
         return console.log(err)
      }
      req.flash('success', 'Updated');
      res.redirect('/userdetales/'+ updated._id)
   })
});

router.delete('/user/:id/delete', function (req, res) {
   User.findByIdAndRemove(req.params.id, function (err, deleted) {
      if(err){
         return req.flash("error", err)
      }
      req.flash('success', deleted.firstname + " deleted")
      res.redirect('/profile')
   })
});



module.exports = router;