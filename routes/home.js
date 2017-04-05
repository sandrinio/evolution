var express = require('express');
var router = express.Router();


router.get('/home', function (req, res) {
  res.render('main/home')
});



module.exports = router;