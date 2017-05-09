var app = require('express')();
var bodyParser = require('body-parser')
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

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.get('/auth/google', controllers.auth.redirectWithScope);

app.get('/auth/google/callback', controllers.auth.callback);

app.use(controllers.auth.middleware);

app.get('/logout', controllers.auth.logout)

app.listen(process.env.PORT, function() {
  console.log("Application running on http://localhost:8000");
});
