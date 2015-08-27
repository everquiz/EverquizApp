var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date },
  status: {type: Number, default: 0 }
});

module.exports = mongoose.model('Quiz', QuizSchema);