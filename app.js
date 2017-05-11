var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('./controllers/auth').strategy;
var controllers = require('./controllers/all');

mongoose.connect('mongodb://db:' + process.env.DB_PORT + '/app', function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Successfully connected to MongoDB");
  }
});

passport.use(GoogleStrategy);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/auth/google', controllers.auth.redirectWithScope);

app.get('/auth/google/callback', controllers.auth.callback);

app.get('/auth/check', controllers.auth.check);

app.use(controllers.auth.middleware);

app.get('/auth/logout', controllers.auth.logout);

app.get('/user', controllers.user.info);
app.get('/user/check/in', controllers.user.checkIn);
app.get('/user/check/out', controllers.user.checkOut);

app.get('/time', controllers.time.all);

app.listen(process.env.PORT, function() {
  console.log("Application running on http://localhost:8000");
});
