'use strict';

var express = require('express');
var router = express.Router();
var Posts = require('../models/post');
var User = require('../models/user');
var path = require('path');
var middleware = require('../middleware');
var fs = require('fs'),
    formidable = require('formidable'),
    readChunk = require('read-chunk'),
    fileType = require('file-type');
var mailer = require('../middleware/mails');

router.get('/home', middleware.isLoggedIn, function (req, res) {
   Posts.find({ 'status': 'Solved' }).sort('-date').exec(function (err, postContent) {
      if (err) {
         return req.flash('error', err);
      }

      res.render('main/home', {
         page_name: 'home',
         postContent: postContent });
   });
});

router.get('/instructions', middleware.isLoggedIn, function (req, res) {
   Posts.find({ 'status': 'Instruction' }).sort('date').exec(function (err, postContent) {
      if (err) {
         return req.flash('error', err);
      }
      res.render('requests/instructions', {
         page_name: 'instructions',
         reqsContent: postContent
      });
   });
});

router.get('/home/apple-reg', function (req, res) {
   res.render('main/apple');
});

router.get('/home/google-reg', function (req, res) {
   res.render('main/google');
});

router.get('/home/new-post', function (req, res) {
   res.render('main/new', { page_name: 'none' });
});

router.get('/quiz', function (req, res) {
   res.render('main/coming_soon');
});

router.get('/stock', function (req, res) {
   res.render('main/coming_soon');
});

router.get('/target', function (req, res) {
   res.render('main/coming_soon');
});

router.get('/home/show/:id', middleware.isLoggedIn, middleware.isLoggedIn, function (req, res) {
   Posts.findById(req.params.id).populate("comments").exec(function (err, result) {
      if (err) {
         return req.flash(err);
      }
      res.render('main/show', {
         page_name: 'none',
         result: result
      });
   });
});

router.post('/upload_photos', function (req, res) {
   var photos = [],
       form = new formidable.IncomingForm();

   // Tells formidable that there will be multiple files sent.
   form.multiples = true;
   // Upload directory for the images
   form.uploadDir = path.join(__dirname, '../public/uploads/blogUploads/');

   // Invoked when a file has finished uploading.
   form.on('file', function (name, file) {
      // Allow only 3 files to be uploaded.
      if (photos.length === 3) {
         fs.unlink(file.path);
         return true;
      }

      var buffer = null,
          type = null,
          filename = '';

      // Read a chunk of the file.
      buffer = readChunk.sync(file.path, 0, 262);
      // Get the file type using the buffer read using read-chunk
      type = fileType(buffer);

      // Check the file type, must be either png,jpg or jpeg
      if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
         // Assign new file name
         filename = Date.now() + '-' + file.name;

         // Move the file with the new file name
         fs.rename(file.path, path.join(__dirname, '../public/uploads/blogUploads/' + filename));

         // Add to the list of photos
         photos.push({
            status: true,
            filename: filename,
            type: type.ext,
            publicPath: '/uploads/blogUploads/' + filename
         });
      } else {
         photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
         });
         fs.unlink(file.path);
      }
   });

   form.on('error', function (err) {
      console.log('Error occurred during processing - ' + err);
   });

   // Invoked when all the fields have been processed.
   form.on('end', function () {
      console.log('All the request fields have been processed.');
   });

   // Parse the incoming form fields.
   form.parse(req, function (err, fields, files) {
      res.status(200).json(photos);
   });
});

router.post('/home/new-content', middleware.isLoggedIn, function (req, res) {
   var postContent = req.body.nPost;
   postContent.author = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      pic: req.user.pic,
      id: req.user._id
   };
   if (req.body.status == undefined) {
      postContent.status = 'Unsolved';
   } else {
      postContent.status = req.body.status;
   }

   if (postContent.title.length <= 1 && postContent.content <= 1) {
      req.flash('error', 'სათაური ან კონტენტი თავისუფალია');
      res.redirect('back');
   } else {
      Posts.create(postContent, function (err, createdPost) {
         if (err) {
            return console.log(err);
         }
         var postCount = Number;
         if (req.user.posts == undefined) {
            postCount = 1;
         } else {
            postCount = req.user.posts + 1;
         }
         var finalCount = { posts: postCount };

         User.findByIdAndUpdate(req.user._id, finalCount, function (err, user) {
            if (err) {
               return req.flash("error", err);
            }
            req.flash("success", "Good Job :)");
            res.redirect("/home/show/" + createdPost.id);
         });
      });
   }
});
router.delete("/home/:id", middleware.permissionChecker, function (req, res) {
   Posts.findByIdAndRemove(req.params.id, function (err, blogPost) {
      if (err) {
         console.log(err);
      } else {
         req.flash("success", blogPost.title + " " + "has been removed");
         res.redirect("back");
      }
   });
});

module.exports = router;
//# sourceMappingURL=home.js.map