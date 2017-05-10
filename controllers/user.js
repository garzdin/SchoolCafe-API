var info = function(req, res) {
  res.json({
    user: req.user
  });
};

module.exports = {
  info: info
}
