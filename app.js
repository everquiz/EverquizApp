var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('express-restify-mongoose');
var acl = require('acl');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');


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
restify.serve(router, UserModel);
restify.serve(router, QuizModel);
restify.serve(router, HistoryModel);
restify.serve(router, QuestionModel);
restify.serve(router, AnswerModel);
app.use(router);


// Check your current user and roles
app.get( '/status', function( request, response ) {
  console.log(request);
  response.send( 'token: ' + JSON.stringify( request.token ));
    // acl.userRoles( get_user_id( request, response ), function( error, roles ){
    //     response.send( 'User: ' + JSON.stringify( request.user ) + ' Roles: ' + JSON.stringify( roles ) );
    // });
});
app.get('/user', acl.middleware(1, get_user_id), function(req, res, next) {
  res.send( 'Welcome user!' );
  // res.render('user');
});
app.get('/admin', acl.middleware(1, get_user_id), function(req, res, next) {
  res.send( 'Welcome admin!' );
  // res.render('admin');
});

function get_user_id( request, response ) {
  // return JSON.parse(window.atob(window.localStorage['everquizApp-token'].split('.')[1]))._id || false;
  // return request.user && request.user.id.toString() || false;
  console.log(request.token)
  return false;
}

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