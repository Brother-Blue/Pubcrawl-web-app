var passport = require('passport'); // TODO: install this in server directory, "npm install passport"
var LocalStrategy = require('passport-local'); // TODO: install this in server directory, "npm install passport-local"

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Incorrect username.'});
            if (!user.validPassword(password)) return done(null, false, {message: 'Invalid password.'});
            return done(null, user);
        });
    }
));












