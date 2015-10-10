var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var OpenIDStrategy = require('passport-openid').Strategy;
var GitlabStrategy = require('passport-gitlab').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var configAuth = require('./auth');

//Local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//GitLab strategy
passport.use(new GitlabStrategy({
    clientID: configAuth.epamAuth.clientID,
    clientSecret: configAuth.epamAuth.clientSecret,
    gitlabURL : configAuth.epamAuth.gitlabURL,
    callbackURL: configAuth.epamAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
            console.log('gitlab strategy');
            // try to find the user based on their google id
            User.findOne({ 'epam.id' : profile.id }, function(err, user) {
                console.log(profile);
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.name = profile.displayName;
                    newUser.email = profile.emails[0].value;

                    // save the user
                    // newUser.save(function(err) {
                    //     if (err)
                    //         throw err;
                    //     return done(null, newUser);
                    // });
                }
            });
        });
  }
));

//Google strategy
passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.name = profile.displayName;
                    newUser.email = profile.emails[0].value;

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

passport.use(new VKontakteStrategy({

        clientID        : configAuth.vkAuth.clientID,
        clientSecret    : configAuth.vkAuth.clientSecret,
        callbackURL     : configAuth.vkAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'vkontakte.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();
                    console.log(profile);
                    // set all of the relevant information
                    newUser.vkontakte.id    = profile.id;
                    newUser.photo = profile.photos[0].value;
                    newUser.name = profile.displayName;
                    newUser.profileUrl = profile.profileUrl;

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
});