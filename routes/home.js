var express = require('express');
var router = express.Router();
var Posts = require('../models/post');
var User = require('../models/user');
var path = require('path');
var middleware = require('../middleware');
var mailer         = require('../middleware/mails');
let multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/uploads/blogUploads/')
   },
   filename: function (req, file, cb) {
      let tempName = Date.now() + "-" + file.originalname;
      cb(null, tempName);
      imageName.imgName = tempName;
   }
});
const upload = multer({ storage: storage });

let imageName = {};




router.get('/home', middleware.isLoggedIn, function (req, res) {
   Posts.find({'status': 'Solved'}).sort('-date').exec(function (err, postContent) {
      if(err){
         return req.flash('error', err)
      }
      res.render('main/home', {
         page_name: 'home',
         postContent: postContent })
                     });
});

router.get('/instructions', middleware.isLoggedIn, function (req, res) {
   Posts.find({'status': 'Instruction'}).sort('date').exec(function (err, postContent) {
      if(err){
         return req.flash('error', err)
      }
      res.render('requests/instructions', {
         page_name: 'instructions',
         reqsContent: postContent
      })
   })
});

router.get('/home/apple-reg', function (req, res) {
   res.render('main/apple') 
});

router.get('/home/google-reg', function (req, res) {
   res.render('main/google') 
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
      if(err){
         return req.flash(err)
      }
      res.render('main/show', {
         page_name: 'none',
         result: result
      })
   })
});


router.post('/ck_upload', upload.any('editor1'), (req, res) => {

   // console.log(imageName.imgName)

   // res.send('/upload/basic_uploads/' + imageName.imgName)

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
   var postContent = req.body.nPost;
   postContent.author = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      pic: req.user.pic,
      id: req.user._id
   };
      if(req.body.status == undefined){
      postContent.status = 'Unsolved'
      } else {
         postContent.status = req.body.status;
      }

   if(postContent.title.length <= 1 && postContent.content <= 1){
      req.flash('error', 'სათაური ან კონტენტი თავისუფალია');
      res.redirect('back')
   }else{
   Posts.create(postContent, function (err, createdPost) {
      if(err){
         return console.log(err);
      }
      var postCount = Number;
      if(req.user.posts == undefined){
         postCount = 1
      }else{
         postCount = req.user.posts + 1
      }
      var finalCount = { posts: postCount };

      User.findByIdAndUpdate(req.user._id, finalCount, function (err, user) {
         if(err){
            return req.flash("error", err)
         }
         req.flash("success", "Good Job :)");
         res.redirect("/home/show/" + createdPost.id);
      })

   });
   }
});
router.delete("/home/:id", middleware.permissionChecker, function (req, res) {
   Posts.findByIdAndRemove(req.params.id, function (err, blogPost) {
      if(err){
         console.log(err)
      }else{
         req.flash("success", blogPost.title + " " + "has been removed");
         res.redirect("back");
      }
   });
});

module.exports = router;