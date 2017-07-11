var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
   username: String,
   firstname: String,
   lastname: String,
   bday: String,
   tel: String,
   password: String,
   permission: String,
   office: String,
   position: String,
   pic: String,
   score: [],
   posts: Number,
   comments: Number
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);