var User = require('../models/user').model;
var Time = require('../models/time').model;

var info = function(req, res) {
  res.json({
    user: req.user
  });
};

var onlineUsers = function(req, res) {
  User.find({ online: true }, function(err, users) {
    if (err) return res.json({"error": error});
    res.json({
      count: users.length
    });
  });
};

var checkIn = function(req, res) {
  Time.create({
    start: Date.now(),
    user: req.user._id
  }, function(err, time) {
    if (err) return res.json({"error": err});
    res.json({
      time: time
    });
  });
};

var checkOut = function(req, res) {
  Time.findByIdAndUpdate(req.query.id, {
    end: Date.now()
  }, function(err, time) {
    if (err) return res.json({"error": error});
    res.json({
      time: time
    });
  });
};

module.exports = {
  info: info,
  onlineUsers: onlineUsers,
  checkIn: checkIn,
  checkOut: checkOut
}
