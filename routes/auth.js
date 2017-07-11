var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require("passport");
var middleware = require("../middleware");


router.get('/', function (req, res) {
  res.render('auth/login')
});

router.get('/register', function (req, res) {
  res.render('auth/register')
});

router.post('/register', function (req, res) {
  if(req.body.password === req.body.repassword) {
    var userInfo = req.body.user;
    User.register(userInfo, req.body.password, function (err, user) {
      if(err){
        req.flash('error', err)
      }else{
        res.redirect('/instructions')
      }
    })
  }else{
    res.flash('error', 'Password Typo')
  }
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/instructions",
  failureRedirect: "/"
}), function (req, res) {
  res.flash("success", 'Welcome');
  res.redirect("/instructions");
});

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/");
});

module.exports = router;