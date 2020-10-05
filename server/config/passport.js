var User = require('../models/user');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var JWTstrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;

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

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport