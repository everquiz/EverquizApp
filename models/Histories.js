var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  createAt: Date,
  result: String
});

module.exports = mongoose.model('History', HistorySchema);