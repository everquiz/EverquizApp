var mongoose = require('mongoose');

var AchievementsSchema = new mongoose.Schema({
    description: String,
    picture: { data: Buffer, contentType: String },
    title: String
});

module.exports = mongoose.model('Achievements', AchievementsSchema);
module.exports.AchievementsSchema = AchievementsSchema;