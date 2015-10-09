var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var NoteSchema = require('./Notes').NoteSchema;
var HistorySchema = require('./Histories').HistorySchema;

var UserSchema = new mongoose.Schema({
  name: { type:String, default: "User_Default" },
  email: {type: String, unique: true },
  google: {
      id: String
    },
  vkontakte: {
    id: String,
    profileUrl: String
  },
  photo: {type: String},
  hash: String,
  salt: String,
  status: {type: String, default: 'active' },
  history: [ { type: mongoose.Schema.Types.ObjectId, ref: 'History'  } ],
  createAt: { type: Date, default: new Date },
  roles: { type: [String], default: "user" },
  achievements: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement'  } ]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    roles: this.roles,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

var User = mongoose.model('User', UserSchema);


HistorySchema.pre('save', function(next, done) {
  var history = this;
  User.findById(history.user, function (err, user) {
    user.history.push(history._id);
    user.save();
  });
  next();
});

module.exports = User;