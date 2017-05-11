var Homework = require('../models/homework').model;

var all = function(req, res) {
  Homework.find({}, function(err, homework) {
    if (err) return res.json({"error": err});
    res.json({
      homework: homework
    });
  });
};

var add = function(req, res) {
  Homework.create({
    task: req.body.task,
    subject: req.body.subject
  }, function(err, homework) {
    if (!req.user.teacher) {
      return res.json({"error": "not_teacher"});
    }
    if (err) return res.json({"error": err});
    res.json({
      homework: homework
    });
  });
};

module.exports = {
  all: all,
  add: add
}
