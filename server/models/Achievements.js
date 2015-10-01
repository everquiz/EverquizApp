var mongoose = require('mongoose');

var AchievementSchema = new mongoose.Schema({
    description: String,
    picture: { data: Buffer, contentType: String },
    title: String
});

module.exports = mongoose.model('Achievement', AchievementSchema);
module.exports.AchievementSchema = AchievementSchema;