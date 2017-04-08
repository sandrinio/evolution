var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Evo = require('../models/evolution')

router.get('/admin-panel', function (req, res) {
  User.find({}, function (err, user) {
    if(err){
      console.log(err)
    }else{
      var userObject = [];
      user.forEach(function (p1) {
        userObject.push(p1);
      });
      var i = -1;
      userObject.forEach(function (p1) {
        var averageScore = p1.score.reduce(add, 0);
            function add(a, b) {
              return a + b / p1.score.length
            }
            i++;
            userObject[i].score = averageScore;
      });
        res.render('admin/admin-panel', { users: userObject })

    }
  });
});

router.get('/admin-panel/evaluation-list/:id', function (req, res) {
 User.findById(req.params.id, function (err, user) {
   if(err){
     console.log(err)
   }else{
     Evo.find({'evaluated': user.fullname}, function (err, eva) {
       if(err){
         console.log(err)
       }else {
         Evo.find({'author.fullname': user.fullname}, function (err, evalu) {
           if(err){
             console.log(err)
           }else{
             res.render('admin/evaluation-list', {
               eva: eva,
               thisUser: user,
               evalu: evalu
             });
           }
         });
       }
     });
   }

 });

});

router.get('/admin-panel/evaluation/:id', function (req, res) {
  res.send('show page')
});



module.exports = router;