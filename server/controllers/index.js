var review = require('./reviews');
var user = require('./users');
var event = require('./events');
var bar = require('./bars');
var express = require('express');
var passport = require('../config/passport');

var router = express.Router();

// Endpoint APIs
router.use('/users', user);
router.use('/reviews', review);
router.use('/events', event);
router.use('/bars', bar);

router.post('/login',
  passport.authenticate('local', { successRedirect: '/' })
    
);

router.get('/login', function(req, res, next) {
  console.log("Hjalmar u bitch");
})

module.exports = router;