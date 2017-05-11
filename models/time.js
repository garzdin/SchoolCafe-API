var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
  start: {
    type: Date,
    require: true
  },
  end: {
    type: Date,
    require: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = {
  schema: TimeSchema,
  model: mongoose.model('Time', TimeSchema)
};
