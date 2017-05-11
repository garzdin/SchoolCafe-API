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
  if (!req.user.teacher) {
    return res.json({"error": "not_teacher"});
  }
  Homework.create({
    task: req.query.task,
    subject: req.query.subject
  }, function(err, homework) {
    if (err) return res.json({"error": err});
    res.json({
      homework: homework
    });
  });
};

var remove = function(req, res) {
  if (!req.user.teacher) {
    return res.json({"error": "not_teacher"});
  }
  Homework.findByIdAndRemove(req.query.id, function(err, homework) {
    if (err) return res.json({"error": err});
    res.json({
      homework: homework
    });
  });
};

module.exports = {
  all: all,
  add: add,
  remove: remove
}
