var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  text: String,
  correct: Boolean,
  createAt: Date,
  count: Number,
  successCount: Number
});

mongoose.model('Answer', AnswerSchema);