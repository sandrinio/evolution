var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  bday: String,
  tel: String,
  password: String,
  permission: String,
  position: String,
  score: []
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);