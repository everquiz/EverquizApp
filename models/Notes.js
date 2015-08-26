var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  title: String,
  text: String,
  createAt: Date,
  editedAt: Date
});

module.exports = mongoose.model('Note', NoteSchema);