var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var NoteSchema = new mongoose.Schema({
  title: String,
  text: String,
  createAt: {type: Date, default: new Date },
  editedAt: {type: Date, default: new Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Note', NoteSchema);
var NoteModel = mongoose.model('Note');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  hash: String,
  salt: String,
  password: String,
  status: {type: String, default: 'active' },
  notes: [ NoteSchema ],
  history: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Hystory'  } ],
  createAt: {type: Date, default: new Date } 
});

UserSchema.methods.addNote = function(title, text) {
    this.notes.push(new NoteModel({ title: title, text: text }));
};

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
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

mongoose.model('User', UserSchema);
var UserModel = mongoose.model('User');

module.exports.NoteModel = NoteModel;
module.exports.UserModel = UserModel;
