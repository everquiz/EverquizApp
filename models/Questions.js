var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  createAt: Date,
});

mongoose.model('Question', QuestionSchema);