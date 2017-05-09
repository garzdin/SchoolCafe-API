var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/user').model;
var jwt = require('jwt-simple');
var reactBaseURL = require('../config').reactBaseURL;

var strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id }, function(err, user) {
      if (err) return cb(err, null);
      if (!user) {
        User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          familyName: profile.familyName,
          givenName: profile.givenName,
          photo: profile.photos[0].value
        }, function(cErr, cUser) {
          if (cErr) return cb(cErr, null);
          return cb(null, cUser);
        });
      } else {
        return cb(null, user);
      }
    });
  }
);

var redirectWithScope = passport.authenticate('google', { scope: ['profile', 'email'] });

var callback = function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect(reactBaseURL + '/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(reactBaseURL);
    });
  })(req, res, next);
};

var middleware = function(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect(reactBaseURL + '/login');
  }
  next();
};

var logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = {
  strategy: strategy,
  redirectWithScope: redirectWithScope,
  callback: callback,
  middleware: middleware,
  logout: logout
}
