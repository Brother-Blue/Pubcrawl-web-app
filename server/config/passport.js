var User = require('../models/user');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var JWTstrategy = require('passport-jwt').Strategy;

// TODO: add 'passport.authenticate('jwt', { session: false }),' to APIs that we want to protect

passport.use('login', new localStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        var user = await User.findOne({ username });

        if (!user) {
          return done(null, false, {'message': 'wrong username or password'});
        }

        var validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {'message': 'wrong username or password'});
        }

        return done(null, user, {'message': 'Logged in Successfully'});
      } catch (error) {
        return done(error);
      }
    }
  )
);

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
  {
      token = req.cookies['jwt'];
  }
  return token;
};

passport.use(new JWTstrategy(
  {
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'sea shanty 2 remix',
},
(jwtPayload, done) => {
  if (Date.now() > jwtPayload.expires) {
    return done('jwt expired');
  }
  return done(null, jwtPayload);
}
));

module.exports = passport