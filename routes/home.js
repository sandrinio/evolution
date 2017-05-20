var express = require('express');
var router = express.Router();
var middleware = require('../middleware');


router.get('/home', function (req, res) {
  res.render('main/home', { page_name: 'home' })
});

router.get('/home/apple-reg', (req, res) => {
   res.render('main/apple') 
});

router.get('/home/google-reg', (req, res) => {
   res.render('main/google') 
});

module.exports = router;