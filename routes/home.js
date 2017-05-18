var express = require('express');
var router = express.Router();
var middleware = require('../middleware');


router.get('/home', function (req, res) {
  res.render('main/home', { page_name: 'home' })
});



module.exports = router;