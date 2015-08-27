var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date },
  status: {type: Number, default: 0 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Quiz', QuizSchema);