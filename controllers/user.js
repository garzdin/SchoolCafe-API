var User = require('../models/user').model;

var info = function(req, res) {
  res.json({
    user: req.user
  });
};

var status = function(req, res) {
  User.findByIdAndUpdate(req.user._id, {
    online: req.query.online
  }, function(err, user) {
    if (err) return res.json({"message": error});
    res.json({
      user: user
    });
  });
};

module.exports = {
  info: info,
  status: status
}
