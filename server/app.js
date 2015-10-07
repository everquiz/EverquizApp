var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    restify = require('express-restify-mongoose'),
    acl = require('acl'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    jwt = require('express-jwt'),
    auth = jwt({secret: 'SECRET', userProperty: 'payload'}),
    favicon = require('express-favicon'),
    fs = require('fs');


/*
 Connect to db
 */
require('./config/db');

var UserModel = require('./models/Users');
var NoteModel = require('./models/Notes');
var QuizModel = require('./models/Quizzes');
var CategoryModel = require('./models/Categories');
var HistoryModel = require('./models/Histories');
var QuestionModel = require('./models/Questions');
var AnswerModel = require('./models/Answers');
var AchievementModel = require('./models/Achievements');

// var achievements = [
//     {
//         title: 'Welcome',
//         description: 'Welcome to our awesome service!',
//         picture: {
//             data: fs.readFileSync('assets/images/achievements/welcome.jpg'),
//             contentType: 'image/png'
//         }
//     },
//     {
//         title: 'First Note',
//         description: 'You have created your first note!',
//         picture: {
//             data: fs.readFileSync('assets/images/achievements/firstNote.jpg'),
//             contentType: 'image/png'
//         }
//     },
//     {
//         title: 'First Quiz',
//         description: 'Congratulation on passing your first quiz!',
//         picture: {
//             data: fs.readFileSync('assets/images/achievements/firstQuiz.jpg'),
//             contentType: 'image/png'
//         }
//     },
//     {
//         title: 'Finished Quiz',
//         description: 'It\'s awesome! You have completly finished quiz!',
//         picture: {
//             data: fs.readFileSync('assets/images/achievements/completedQuiz.jpg'),
//             contentType: 'image/png'
//         }
//     }
// ];

// for (var i = achievements.length - 1; i >= 0; i--) {
//     var achievement = new AchievementModel;
//     achievement.title = achievements[i].title;
//     achievement.description = achievements[i].description;
//     achievement.picture = achievements[i].picture;
//     achievement.save();
// };

require('./config/passport');

/*
 Routes
 */
var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();
app.use(favicon(path.join(__dirname,'../public','i','favicon.ico')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());


app.use(passport.initialize());

var router = express.Router();
restify.serve(router, NoteModel);
restify.serve(router, UserModel, {
    private: ['hash', 'salt']
});
restify.serve(router, QuizModel);
restify.serve(router, CategoryModel);
restify.serve(router, HistoryModel);
restify.serve(router, QuestionModel);
restify.serve(router, AnswerModel);
restify.serve(router, AchievementModel);

app.use(router);

app.use('/', routes);
// app.use('/users', users);

app.use(auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
