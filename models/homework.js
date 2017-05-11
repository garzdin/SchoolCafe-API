var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeworkSchema = new Schema({
  task: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    require: true
  }
});

module.exports = {
  schema: HomeworkSchema,
  model: mongoose.model('Homework', HomeworkSchema)
};
