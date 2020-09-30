var User = require('../models/user');
var Review = require('../models/review');
var Event = require('../models/event');
var express = require('express');
var passport = require('passport');

var router = express.Router();

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// Create user
router.post('', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});  

// Read user
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        res.status(200).json(user);
    });
});

// Read all users and partially filter by username
router.get('', function(req, res, next) {   
    if (!req.query.username){return next();}
    User.find({
        username: { $regex: req.query.username, $options: "i" }
    },
        function(err, users) {
            if (err) { return next(err); }
            if (!users) { return res.status(404).json(
                {"message": "no users found"});
            }
        res.status(200).json(users);
    });
});

// Read all users 
router.get('', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.status(200).json({"users": users});
    });
});

// Read all user reviews
router.get('/:id/reviews', function(req, res, next) {
    User.findById(req.params.id).populate('reviews').exec(function(err, user) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        res.status(200).json(user.reviews);
    })
});

// Update user
router.put('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.isVerified = req.body.isVerified;
        user.passwordResetToken = req.body.passwordResetToken;
        user.passwordResetExpires = req.body.passwordResetExpires;
        user.reviews = req.body.reviews;
        user.save();
        res.status(200).json(user);
    });
});

// Update user partially
router.patch('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        user.email = (req.body.email || user.email);
        user.username = (req.body.username || user.username);
        user.password = (req.body.password || user.password);
        user.isVerified = (req.body.isVerified || user.isVerified);
        user.passwordResetToken = (req.body.passwordResetToken || user.passwordResetToken);
        user.passwordResetExpires = (req.body.passwordResetExpires || user.passwordResetExpires);
        user.reviews = (req.body.reviews || user.reviews);
        user.save();
        res.status(200).json(user);
    });
});

// Delete user
router.delete('/:id', function(req, res, next) {
    User.findByIdAndDelete({_id: req.params.id}, function(err, user) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        Event.deleteMany(
            { users: req.params.id },
            { multi: true }
        ).exec();
        Review.updateMany(
            { users: req.params.id },
            { $set: { users: null } },
            { multi: true }
        ).exec();
        res.status(200).json(user);
    });
});

// Delete all users
router.delete('', function(req, res, next) {
    User.deleteMany({}, function(err, user) {
        if (err) { return next(err)};
        if (!user) { 
            return res.status(404).json(
                {"message": "no users found"});
        }
        res.status(202).json(
            {"message": "all users have been deleted"});
    });
});

module.exports = router;