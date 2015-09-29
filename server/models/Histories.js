var mongoose = require('mongoose');
var UserModel = require('./Users');

var HistorySchema = new mongoose.Schema({
    quiz: {type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
    createdAt: {type: Date},
    updatedAy: {type: Date},
    result: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

HistorySchema.pre('save', function(next){
  now = new Date();
  this.editedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('History', HistorySchema);
module.exports.HistorySchema = HistorySchema;