"use strict";

var middlewareObject = {};

middlewareObject.permissionChecker = function (req, res, next) {
  if (req.isAuthenticated() && req.user.permission === "Admin") {
    next();
  } else {
    req.flash("error", "No permission");
    res.redirect("back");
  }
};

middlewareObject.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'You have to be logged in');
    res.redirect("/");
  }
};

module.exports = middlewareObject;
//# sourceMappingURL=index.js.map