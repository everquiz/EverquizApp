var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: {type: String, default: 'active' },
  notes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Note'  } ],
  history: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Hystory'  } ],
  createAt: Date
});

mongoose.model('User', UserSchema);