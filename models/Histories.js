var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  createAt: Date,
  result: String
});

mongoose.model('History', HistorySchema);