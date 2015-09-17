var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  title: {type: String, unique: true},
  description: String,
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date }
});

module.exports = mongoose.model('Category', CategorySchema);