var mongoose = require('mongoose');
var UserModel = require('./Users');

var HistorySchema = new mongoose.Schema({
    quiz: {type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
    create: {type: Date, default: new Date},
    result: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('History', HistorySchema);
module.exports.HistorySchema = HistorySchema;