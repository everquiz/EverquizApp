var mongoose = require('mongoose');
var UserModel = require('./Users');

var NoteSchema = new mongoose.Schema({
    title: String,
    text: String,
    createAt: {type: Date, default: new Date},
    editedAt: {type: Date, default: new Date},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Note', NoteSchema);
module.exports.NoteSchema = NoteSchema; 