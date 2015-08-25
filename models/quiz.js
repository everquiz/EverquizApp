var mongoose = require('../lib/mongoose');

exports.Quiz = mongoose.model("Quiz", { questions: Array,
                                    variants: Array,
                                    answers: Array,
                                    category: String,
                                    name: String,
                                    difficulty: String
                                  });