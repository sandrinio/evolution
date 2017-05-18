var express = require("express");
var User = require("../models/user");
var router = express.Router();
var middleware = require("../middleware")


router.get("/offices", middleware.isLoggedIn, function (req, res) {
    User.find({}, function (err, user) {
        if(err){
            console.log(err);
        }else{
            res.render("office/offices", {
                user: user,
                page_name: 'offices'
            });
        }
    });
});


module.exports = router;