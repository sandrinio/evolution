/**
 * Created by Sandro on 1/27/17.
 */
var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Posts = require("../models/post");
var middleware = require("../middleware");





router.post("/home/:id/comments", function (req, res) {
   console.log(req.body.comment);
   Posts.findById(req.params.id, function (err, foundPost) {
      if(err){
         req.flash("error", err);
         res.redirect("back")
      }else{
         Comment.create({text: req.body.comment}, function (err, newComment) {
            if(err){
               req.flash("error", err);
               res.redirect("back")
            }else{
               newComment.author.id = req.user._id;
               newComment.author.firstname = req.user.firstname;
               newComment.author.lastname = req.user.lastname;
               newComment.author.pic = req.user.pic;
               newComment.save();

               foundPost.comments.push(newComment);
               foundPost.save();
            }
         });
         res.redirect("/home/show/" + req.params.id);
      }
   })
});


module.exports = router;