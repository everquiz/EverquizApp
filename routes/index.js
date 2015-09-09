var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('express-jwt'),
    auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// ADMIN USER
var admin = new User();
admin.email = "admin@admin.com";
admin.setPassword("admin");
admin.roles = ["admin"];
admin.save(admin.generateJWT());




router.post('/register', function(req, res, next){
  console.log('req.body');
  console.log(req.body);
  if(!req.body.email || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.email = req.body.email;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.email || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){return next(err); }
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/*

To require authentication use methods like this 
router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.email;
}

*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Check your current user and roles
router.get( '/status', auth, function( request, response, next ) {
  console.log('/status');
  console.log(request.payload.roles[0]);
  if (request.payload.roles[0] === 'admin') {
    response.send('admin');
  } else if(request.payload.roles[0] === 'user'){
    response.send('user');
  };
});

module.exports = router;