var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    restify = require('express-restify-mongoose'),
    acl = require('acl'),
    passport = require('passport'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    jwt = require('express-jwt'),
    auth = jwt({secret: 'SECRET', userProperty: 'payload'});



/*
  Connect to db
 */
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/everquizdb');
  
db.on('connected', function() {
    console.log('Mongoose connected to everquizdb');
});

db.on('disconnected', function(){
    console.log('Mongoose disconnected');
});


/**
 * acl connect
 */
acl = new acl(new acl.mongodbBackend(db, 'acl_'));
acl.allow('user', '/user', '*');
acl.allow('admin', '/admin', '*');


var UserModel = require('./models/Users');
var NoteModel = require('./models/Notes');
var QuizModel = require('./models/Quizzes');
var CategoryModel = require('./models/Categories');
var HistoryModel = require('./models/Histories');
var QuestionModel = require('./models/Questions');
var AnswerModel = require('./models/Answers');

/**
 * Populate categories
 */
require('./config/populateCategories');

require('./config/passport');

/*
  Routes
 */
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  secret: 'route66',
  cookie: { maxAge: 600000 },
  resave: true,
  saveUninitialized: true
})); //session secret

app.use(passport.initialize());
app.use(passport.session()); //persistent login session

var router = express.Router();
restify.serve(router, NoteModel);
restify.serve(router, UserModel, {
  middleware: auth,
  prereq: function(req) {
    if (req.payload.roles[0] === 'admin') {
      return true;
    } 

    return false;
  },
  access: function(req) {
    console.log(req.payload);

    if (req.payload.roles[0] === 'admin') {
      console.log(req.payload.roles[0] === 'admin');
      return 'public';
    } else {
      console.log(req.payload.roles[0]);
      console.log('else');
      return false;
    }
    
  },
  private: 'email'
});
restify.serve(router, QuizModel);
restify.serve(router, CategoryModel);
restify.serve(router, HistoryModel);
restify.serve(router, QuestionModel);
restify.serve(router, AnswerModel);
app.use(router);

app.use('/', routes);
app.use('/users', users);

app.use(auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/*
 * ------------------------------------------------
 * ACL
 */

// var nodeAcl = new acl(new acl.mongodbBackend(mongoose.connection.db));
// app.use( nodeAcl.middleware );
// 
// var nodeAcl = new acl(new acl.mongodbBackend(mongoose.connection.db));

// nodeAcl.allow('user', 'hello', '*');
// nodeAcl.allow('admin', 'admin', '*');

  
module.exports = app;
