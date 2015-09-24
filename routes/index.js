var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Quiz = mongoose.model('Quiz'),
    Question = mongoose.model('Question'),
    History = mongoose.model('History'),
    Answer = mongoose.model('Answer'),

    jwt = require('express-jwt'),
    auth = jwt({secret: 'SECRET', userProperty: 'payload'});


router.post('/register', function (req, res, next) {
    console.log('req.body');
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();

    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.json({token: user.generateJWT()})
    });
});

router.post('/login', function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

//quizpassing result
router.put('/checkresult', auth, function (req, res, next) {
    var results = req.body;
    var quiz = {
        _id: results._id
    };
    var questionPromise = Question.find({quiz: results._id})
        .populate('answers')
        .exec();

    questionPromise.then(function (questions) {
        quiz.questions = questions;
        var result = checkResult(quiz, results);
        res.send({
            result: result
        });

        var history = new History();
        history.quiz = quiz._id;
        history.result = result;
        history.user = req.payload._id;
        history.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    });
});

function checkResult(quiz, result) {
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var trueVariants = 0;
    var sum = 0;

    for (var i = 0; i < quiz.questions.length; i++) {
        for (var j = 0; j < quiz.questions[i].answers.length; j++) {
            if (result.questions[i].answers[j].userResult === true && quiz.questions[i].answers[j].correct === true) {
                correctAnswers++;
            }
            if (result.questions[i].answers[j].userResult === true && quiz.questions[i].answers[j].correct === false) {
                wrongAnswers++;
            }
            if (quiz.questions[i].answers[j].correct) {
                trueVariants++;
            }
        }

        if (((correctAnswers - wrongAnswers) / trueVariants) > 0) {
            sum += (correctAnswers - wrongAnswers) / trueVariants;
        }
        correctAnswers = 0;
        wrongAnswers = 0;
        trueVariants = 0;
    }
    return sum / (quiz.questions.length);
}

module.exports = router;