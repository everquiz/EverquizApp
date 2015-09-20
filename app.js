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
    favicon = require('express-favicon');


/*
 Connect to db
 */
require('./config/db');

var UserModel = require('./app/models/Users');
var NoteModel = require('./app/models/Notes');
var QuizModel = require('./app/models/Quizzes');
var CategoryModel = require('./app/models/Categories');
var HistoryModel = require('./app/models/Histories');
var QuestionModel = require('./app/models/Questions');
var AnswerModel = require('./app/models/Answers');



require('./config/passport');

/*
 Routes
 */
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(favicon(path.join(__dirname,'public','i','favicon.ico')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());


app.use(passport.initialize());

var router = express.Router();
restify.serve(router, NoteModel);
restify.serve(router, UserModel, {
    private: ['hash', 'salt']
});
//, {
//  middleware: auth,
//  prereq: function(req) {
//    if (req.payload.roles[0] === 'admin') {
//      return true;
//    }
//
//    return false;
//  },
//  access: function(req) {
//    console.log(req.payload);
//
//    if (req.payload.roles[0] === 'admin') {
//      console.log(req.payload.roles[0] === 'admin');
//      return 'public';
//    } else {
//      console.log(req.payload.roles[0]);
//      console.log('else');
//      return false;
//    }
//
//  },
//  private: 'email'
//}
//);
restify.serve(router, QuizModel
//     , {
//     protected: ['__v'],
//     private: ['description', 'status', 'editedAt', 'createAt', '__v'],
//     middleware: auth,
//     access: function (req) {
//         if (req.payload === undefined) {
//             return 'public';
//         }
//         if (req.payload.roles[0] === 'admin') {
//             return 'private';
//         }
//         if (req.payload.roles[0] === 'user') {
//             return 'protected';
//         }
//         return 'public';
//     }
// }
);
restify.serve(router, CategoryModel);
restify.serve(router, HistoryModel);
restify.serve(router, QuestionModel
//     , {
//     private: ['editedAt', 'createAt', '__v'],
//     middleware: auth,
//     access: function (req) {
//         if (req.payload === undefined) {
//             return 'public';
//         }
//         if (req.payload.roles[0] === 'admin') {
//             return 'private';
//         }
//         return 'public';
//     },
//     prereq: function(req) {
//         // TODO No token here, can't check if admin or not
//         console.log(req.method);
        
//         if (req.payload.roles[0] === 'admin') {
//             console.log('admin');
//             return true;
//         }
//         console.log(req.method === 'DELETE');
//         if (req.method === 'DELETE') {
//             console.log('true');
//             return true;
//         }
//         return false;
//      }
// }
);
restify.serve(router, AnswerModel
//     , {
//     private: ['correct', 'editedAt', 'createAt', '__v'],
//     middleware: auth,
//     access: function (req) {
//         if (req.payload === undefined) {
//             return 'public';
//         }
//         if (req.payload.roles[0] === 'admin') {
//             return 'private';
//         }
//         if (req.payload.roles[0] === 'user') {
//             return 'protected';
//         }
//         return 'public';
//     }
// }
);
app.use(router);

app.use('/', routes);
app.use('/users', users);

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
