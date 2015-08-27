var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
});

module.exports = mongoose.model('Question', QuestionSchema);