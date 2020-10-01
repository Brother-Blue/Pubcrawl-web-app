var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) return done(err);
            if (!user) {
              return done(null, false, {'message': 'incorrect username or password'});
            }
            if (!user.validPassword(password)) {
              return done(null, false, {'message': 'incorrect username or password'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport