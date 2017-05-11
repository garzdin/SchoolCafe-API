var Time = require('../models/time').model;

var all = function(req, res) {
  Time.find({}, function(err, times) {
    if (err) return res.json({"error": err});
    if (!req.user.teacher) {
      return res.json({"error": "not_teacher"});
    }
    res.json({
      times: times
    });
  });
};

module.exports = {
  all: all
}
