var express = require('express');
var router = express.Router();
var User = require('../models/user')


router.get('/admin-panel', function (req, res) {
  User.find({}, function (err, user) {
    if(err){
      console.log(err)
    }else{
      res.render('admin/admin-panel', {users: user})
    }
  });
});



module.exports = router;