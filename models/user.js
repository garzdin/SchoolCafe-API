var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  googleId: {
    type: Number,
    require: true,
    index: {
      unique: true
    }
  },
  email:  {
    type: String,
    required: true,
    index: {
      unique: true
    },
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  displayName: {
    type: String,
    required: true
  },
  familyName: {
    type: String
  },
  givenName: {
    type: String
  },
  photo: {
    type: String
  }
});

module.exports = {
  schema: UserSchema,
  model: mongoose.model('User', UserSchema)
};
