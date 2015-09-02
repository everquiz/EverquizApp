var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('express-restify-mongoose');
var acl = require("acl");


/*
  Connect to db
 */
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/everquizdb'
  // , function() {
  //   var nodeAcl = new acl(new acl.mongodbBackend(mongoose.connection.db, "accesscontrol_"));
  //   nodeAcl.allow('user', 'user', '*');
  //   nodeAcl.allow('admin', 'admin', '*');
  //   app.use( nodeAcl.middleware );

  //   app.get('/user', nodeAcl.middleware(1), function(req, res, next) {
  //     res.send( 'Welcome user!' );
  //     // res.render('user');
  //   });
  //   app.get('/admin', nodeAcl.middleware(1), function(req, res, next) {
  //     res.send( 'Welcome admin!' );
  //     // res.render('admin');
  //   });
  //   app.get('/test', function(req, res, next) {
  //     res.send( 'Welcome test!' );
  //     // res.render('admin');
  //   });
  // }
  );
db.on('connected', function() {
    console.log('Mongoose connected to everquizdb');
});

db.on('disconnected', function(){
    console.log('Mongoose disconnected');
});


/**
 * acl connect
 */
acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
acl.allow('user', 'user', '*');
acl.allow('admin', 'admin', '*');





var passport = require('passport');


var UserModel = require('./models/Users');
var NoteModel = require('./models/Notes');
var QuizModel = require('./models/Quizzes');
var HistoryModel = require('./models/Histories');
var QuestionModel = require('./models/Questions');
var AnswerModel = require('./models/Answers');

require('./config/passport')

/*
  Routes
 */
var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

var router = express.Router();
restify.serve(router, NoteModel);
restify.serve(router, UserModel);
restify.serve(router, QuizModel);
restify.serve(router, HistoryModel);
restify.serve(router, QuestionModel);
restify.serve(router, AnswerModel);
app.use(router);

app.get('/user', acl.middleware(1), function(req, res, next) {
  res.send( 'Welcome user!' );
  // res.render('user');
});
app.get('/admin', acl.middleware(1), function(req, res, next) {
  res.send( 'Welcome admin!' );
  // res.render('admin');
});
app.use('/', routes);
// app.use('/users', users);


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