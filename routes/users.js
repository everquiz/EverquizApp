var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Note = mongoose.model('Note');

/* 
  Find all users
 */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

/*
  Find user
 */
router.get('/:user', function(req, res, next) {
  req.user.populate('notes', function(err, user) {
    if (err) { return next(err); }

    res.json(user);
  });
});

// router.get('/users', function(req, res, next) {
//   User.find(function(err, users){
//     if(err){ return next(err); }

//     res.json(users);
//   });
// });

module.exports = router;
