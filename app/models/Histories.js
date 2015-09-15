var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  create: {type: Date, default: new Date},
  isCompleted: Boolean,
  result: Number
});

module.exports = mongoose.model('History', HistorySchema);