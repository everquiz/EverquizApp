var mongoose = require('mongoose');

var StatisticSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    lastResult: Number,
    averageResult: Number,
    bestResult: Number,
    attemptNumber: Number
});

StatisticSchema.methods.addResult = function(result) {
    this.lastResult = result;
    if (result > this.bestResult) this.bestResult = result;
    this.averageResult = (this.averageResult * this.attemptNumber + result) / (this.attemptNumber + 1);
    this.attemptNumber++;
}

module.exports = mongoose.model('Statistic', StatisticSchema);

