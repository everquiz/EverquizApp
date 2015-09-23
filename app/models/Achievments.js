var mongoose = require('mongoose');

var AchievmentsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Achievments', AchievmentsSchema);
module.exports.AchievmentsSchema = AchievmentsSchema;