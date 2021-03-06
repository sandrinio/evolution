var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Evo = require('../models/evolution');
var middleware = require('../middleware');


router.get('/evolution', middleware.isLoggedIn, function (req, res) {
  User.find({}, function (err, user) {
   if(err){
     console.log(err)
   }else{
     res.render('evolution/evolution', {
        users: user,
        page_name: 'evaluation'
     })
   }
 });
});

router.get('/admin-panel/evaluation/:id/', middleware.permissionChecker, function (req, res) {
  Evo.findById(req.params.id, function (err, foundEvaluation) {
    if(err){
      console.log(err)
    }else{
      res.render('admin/show', {evaluation: foundEvaluation})
    }
  });
});

router.post('/evolution', middleware.isLoggedIn, function (req, res) {
  var evo = {};
  evo.evaluated = req.body.evaluated;
  evo.office = req.body.office;
  evo.competency = req.body.competency;
  evo.service = req.body.service;
  evo.discipline = req.body.discipline;
  evo.other = req.body.other;
  evo.author = {
        fullname: req.user.fullname,
        id: req.user._id
  };

   var cStars = (+req.body.competency.c1 + +req.body.competency.c2 + +req.body.competency.c3 + +req.body.competency.c4) / 4;
   evo.competency.cStars = cStars;

   var sStars = (+req.body.service.s1 + +req.body.service.s2 + +req.body.service.s3 + +req.body.service.s4) / 4;
   evo.service.sStars = sStars;

   var dStars = (+req.body.discipline.d1 + +req.body.discipline.d2 + +req.body.discipline.d3) / 3;
   evo.discipline.dStars = dStars;

   var oStars = (+req.body.other.o1 + +req.body.other.o2 + +req.body.other.o3
     + +req.body.other.o4 + +req.body.other.o5 + +req.body.other.o6) / 6;
   evo.other.oStars = oStars;

   var averageScores = cStars + sStars + dStars + oStars / 4;

   evo.score = averageScores;

   console.log('average score:');
   console.log(averageScores);
   console.log('==============');
   // var userRating = [];

  User.findOne({'fullname': req.body.evaluated}, function (err, user) {
    if(err){
      res.send(err)
    }else{
      var userScore = user.score;
      userScore.push(averageScores);


      user.update({score: userScore}, function (err, updatedScore) {
        if(err){
          res.send(err)
        }else{
          Evo.create(evo, function (err, data) {
            if(err){
              console.log(err);
            }else{

              res.redirect('back')
            }
          });
        }
      });
    }
  });


});

module.exports = router;