var User = require('../models/user');
var express = require('express');

var router = express();

// Create new user
router.post('', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
})  

// Read all users 
// TODO: Doesn't work, fix
router.get('', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({"users": users});
    });
});
    
// Read user
// TODO: Doesn't work, fix
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        res.json(user);
    });
});

// Update user
router.put('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.isVerified = req.body.isVerified;
        user.passwordResetToken = req.body.passwordResetToken;
        user.passwordResetExpires = req.body.passwordResetExpires
        user.save();
        res.json(user);
    });
});

// Partially update user
router.patch('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        user.email = (req.body.email || user.email);
        user.username = (req.body.username || user.username);
        user.password = (req.body.password || user.password);
        user.isVerified = (req.body.isVerified || user.isVerified);
        user.passwordResetToken = (req.body.passwordResetToken || user.passwordResetToken);
        user.passwordResetExpires = (req.body.passwordResetExpires || user.passwordResetExpires);
        user.save();
        res.json(user);
    });
});

// Delete user
router.delete('/:id', function(req, res, next) {
    User.findByIdAndDelete({_id: req.params.id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "user not found"});
        }
        res.json(user);
    });
});

module.exports = router;