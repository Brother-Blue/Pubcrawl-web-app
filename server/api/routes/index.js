var review = require('./review');
var user = require('./user');
var event = require('./event');
var bar = require('./bar');
var express = require('express');

var router = express.Router();

// Endpoint APIs
router.use('/users', user);
router.use('/reviews', review);
router.use('/events', event);
router.use('/bars', bar);

module.exports = router;