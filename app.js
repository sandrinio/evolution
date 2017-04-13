var express = require("express");
var app = express();

var mongoose     = require("mongoose"),
  passport       = require("passport"),
  bodyParser     = require("body-parser"),
  flash          = require("connect-flash"),
  LocalStrategy  = require("passport-local"),
  session        = require("express-session"),
  methodOverride = require("method-override"),

  User           = require("./models/user");

var authRoutes = require('./routes/auth'),
    homeRoutes = require('./routes/home'),
    evoRoutes = require('./routes/evolution'),
    adminRoutes = require('./routes/admin'),
    profileRoutes = require('./routes/profile');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
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


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://sandrinio:pachuchi@ds145750.mlab.com:45750/evo");
// mongoose.connect("mongodb://localhost/gsm_guru");















/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში


app.listen(process.env.PORT || 3000, process.env.IP,function () {  //if server is on
  console.log("======STARTED======");
});