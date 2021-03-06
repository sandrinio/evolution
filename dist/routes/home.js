'use strict';

var express = require('express'),
    router = express.Router(),
    Posts = require('../models/post'),
    User = require('../models/user'),
    middleware = require('../middleware'),
    mailer = require('../middleware/mails'),
    multer = require('multer');

var storage = multer.diskStorage({
   destination: function destination(req, file, cb) {
      cb(null, 'public/uploads/blogUploads/');
   },
   filename: function filename(req, file, cb) {
      var tempName = Date.now() + "-" + file.originalname;
      cb(null, tempName);
      imageName.imgName = tempName;
   }
});
var upload = multer({ storage: storage });

var imageName = {};

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
   Posts.find({ 'status': 'Solved' }).sort('date').exec(function (err, postContent) {
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
   res.render('main/new', { page_name: 'new post' });
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

//ckeditor photo ajax upload
router.post('/ajax_upload', upload.any('editor1'), function (req, res) {
   html = "";
   html += "<script type='text/javascript'>";
   html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
   html += "    var url     = \"/uploads/blogUploads/" + imageName.imgName + "\";";
   html += "    var message = \"Uploaded file successfully\";";
   html += "";
   html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
   html += "</script>";

   res.send(html);
});

router.post('/home/new-content', middleware.isLoggedIn, function (req, res) {
   //  sending a mail with content
   var HelperOption = {
      from: "'Geohub ' <g.hub@geohub.ge>",
      to: 'sandro.suladze@gmail.com',
      subject: 'New post by ' + req.user.firstname + ' ' + req.user.lastname,
      html: '<strong>Title:</strong> ' + req.body.nPost.title + '<br> <strong>Status: </strong>' + req.body.status + '<br> <strong>TAG:</strong> ' + req.body.nPost.tag
   };

   mailer.transporter.sendMail(HelperOption, function (error, info) {
      if (error) {
         return console.log(error);
      }
      console.log(info);
   });

   // creating object for mongoose model
   var postContent = req.body.nPost;
   postContent.author = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      pic: req.user.pic,
      id: req.user._id
   };

   //i don't know wtf im checking here
   if (req.body.status == undefined) {
      postContent.status = 'Unsolved';
   } else {
      postContent.status = req.body.status;
   }

   if (postContent.title.length <= 1 && postContent.content <= 1) {
      req.flash('error', 'სათაური ან კონტენტი ვერ მოიძებნა');
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