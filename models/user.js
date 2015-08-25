var mongoose = require('../lib/mongoose');
   
exports.User = mongoose.model('User', { name: String,
                                    mail: String,
                                    password: String,
                                    status: String,
                                    notes: Array,
                                    history: Array,
                                    statistics: Array,
                                    follows: Array
                                  });
  