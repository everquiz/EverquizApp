var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Question', QuestionSchema);