var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  text: String,
  correct: Boolean,
  count: Number,
  successCount: Number,
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

module.exports = mongoose.model('Answer', AnswerSchema);
module.exports.AnswerSchema = AnswerSchema; 
