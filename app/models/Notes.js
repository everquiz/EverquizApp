var mongoose = require('mongoose');
var UserModel = require('./Users');

var NoteSchema = new mongoose.Schema({
    title: String,
    text: String,
    createdAt: {type: Date},
    editedAt: {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

NoteSchema.pre('save', function(next){
  now = new Date();
  this.editedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Note', NoteSchema);
module.exports.NoteSchema = NoteSchema; 