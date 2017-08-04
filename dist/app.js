"use strict";

var express = require("express");
var app = express();

var mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    methodOverride = require("method-override"),
    User = require("./models/user");

var authRoutes = require('./routes/auth'),
    homeRoutes = require('./routes/home'),
    evoRoutes = require('./routes/evolution'),
    adminRoutes = require('./routes/admin'),
    profileRoutes = require('./routes/profile'),
    officeRoutes = require('./routes/offices'),
    commentsRoutes = require('./routes/comments'),
    requestsRoutes = require('./routes/requests');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1800000 }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(authRoutes);
app.use(homeRoutes);
app.use(evoRoutes);
app.use(adminRoutes);
app.use(profileRoutes);
app.use(officeRoutes);
app.use(commentsRoutes);
app.use(requestsRoutes);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://gshops:pachuchi123@ds141351.mlab.com:41351/g-shop");
// // mongoose.connect("mongodb://localhost/gsm_guru");
// Using `mongoose.connect`...
// var promise = mongoose.connect('mongodb://gshops:pachuchi123@ds141351.mlab.com:41351/g-shop', {
//   useMongoClient: true,
//   /* other options */
// });
// // Or `createConnection`
// var promise = mongoose.createConnection('mongodb://gshops:pachuchi123@ds141351.mlab.com:41351/g-shop', {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(function(db) {
/* Use `db`, for instance `db.model()`
});
// Or, if you already have a connection

/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში


app.listen(process.env.PORT || 3000, process.env.IP, function () {
  //if server is on
  console.log("======STARTED======");
});
//# sourceMappingURL=app.js.map