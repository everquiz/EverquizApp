var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createAt: Date,
  status: Number
});

module.exports = mongoose.model('Quiz', QuizSchema);