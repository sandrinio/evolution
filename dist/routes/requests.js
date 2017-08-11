'use strict';

var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var Post = require('../models/post');
var mailer = require('../middleware/mails');

router.get('/request', middleware.isLoggedIn, function (req, res) {
   Post.find({ 'status': '' || 'Unsolved' || 'undefined' }).sort('-date').exec(function (err, reqsContent) {
      if (err) {
         return console.log(err);
      }

      res.render('requests/reqs', {
         page_name: 'reqs',
         reqsContent: reqsContent
      });
   });
});

router.get('/post/:id/edit', function (req, res) {
   Post.findById(req.params.id, function (err, result) {
      if (err) {
         req.flash('Error', err);
         console.log(err);
      } else {
         res.render('requests/edit', {
            result: result,
            page_name: 'none'
         });
      }
   });
});

router.get('/posts/search', function (req, res) {
   Post.find({ $text: { $search: req.query.q } }, { score: { $meta: "textScore" } }).sort("-date").exec(function (err, data) {
      if (err) {
         return console.log(err);
      }
      res.render('main/search_results', {
         postContent: data,
         dataCount: data.length,
         page_name: 'none'
      });
   });
});

router.put('/request/:id/edit', function (req, res) {
   var obj = req.body.nPost;
   obj.status = req.body.status;
   Post.findByIdAndUpdate(req.params.id, obj, function (err, result) {
      if (err) {
         console.log(err);
      } else {
         res.redirect('/home/show/' + req.params.id);
      }
   });
});

module.exports = router;
//# sourceMappingURL=requests.js.map