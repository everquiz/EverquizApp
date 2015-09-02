var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// ADMIN USER

var admin = new User();
admin.email = "admin@admin.com";
admin.setPassword("admin");
admin.roles = ["admin"];
admin.save(admin.generateJWT());




router.post('/register', function(req, res, next){
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

// var Post = mongoose.model('Post');
// var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get('/user', acl.middleware(), function(req, res, next) {
//   res.render('user');
// });
// router.get('/admin', acl.middleware(), function(req, res, next) {
//   res.render('admin');
// });

// router.get('/posts', function(req, res, next) {
//   Post.find(function(err, posts){
//     if(err){ return next(err); }

//     res.json(posts);
//   });
// });

// router.post('/posts', function(req, res, next) {
//   var post = new Post(req.body);
//   post.save(function(err, post){
//     if(err){ return next(err); }

//     res.json(post);
//   });
// });

// router.get('/posts/:post', function(req, res, next) {
//   req.post.populate('comments', function(err, post) {
//     if (err) { return next(err); }

//     res.json(post);
//   });
// });

// router.put('/posts/:post/upvote', function(req, res, next) {
//   req.post.upvote(function(err, post){
//     if (err) { return next(err); }

//     res.json(post);
//   });
// });

// router.post('/posts/:post/comments', function(req, res, next) {
//   var comment = new Comment(req.body);
//   comment.post = req.post;

//   comment.save(function(err, comment){
//     if(err){ return next(err); }

//     req.post.comments.push(comment);
//     req.post.save(function(err, post) {
//       if(err){ return next(err); }

//       res.json(comment);
//     });
//   });
// });

// router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
//   req.comment.upvote(function(err, comment){
//     if (err) { return next(err); }

//     res.json(comment);
//   });
// });

// router.param('post', function(req, res, next, id) {
//   var query = Post.findById(id);

//   query.exec(function (err, post){
//     if (err) { return next(err); }
//     if (!post) { return next(new Error('can\'t find post')); }

//     req.post = post;
//     return next();
//   });
// });

// router.param('comment', function(req, res, next, id) {
//   var query = Comment.findById(id);

//   query.exec(function (err, comment){
//     if (err) { return next(err); }
//     if (!comment) { return next(new Error('can\'t find comment')); }

//     req.comment = comment;
//     return next();
//   });
// });

module.exports = router;