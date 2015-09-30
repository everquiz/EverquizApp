var mongoose = require('mongoose');

var AchievmentsSchema = new mongoose.Schema({
    description: String,
    picture: { data: Buffer, contentType: String },
    title: String
});

module.exports = mongoose.model('Achievments', AchievmentsSchema);
module.exports.AchievmentsSchema = AchievmentsSchema;