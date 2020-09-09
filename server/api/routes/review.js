var Review = require('../models/review');
var express = require('express');

var router = express();

// Create new review
router.post('', function(req, res, next) {
    var review = new Review(req.body);
    review.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
})

// Read all reviews
// TODO: Doesn't work, fix
router.get('', function(req, res, next) {
    Review.find(function(err, reviews) {
        if (err) { return next(err); }
        res.json({"reviews": reviews});
    });
});

// Read review
// TODO: Doesn't work, fix
router.get('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        res.json(review);
    });
});

// Update review
router.put('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        review.rating = req.body.rating;
        review.comment = req.body.comment;
        review.created = req.body.created;
        review.user_id = req.body.user_id;
        review.bar_id = req.body.bar_id;
        review.save();
        res.json(review);
    });
});

// Partially update review
router.patch('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        review.rating = (req.body.rating || review.rating);
        review.comment = (req.body.comment || review.comment);
        review.created = (req.body.created || review.created);
        review.user_id = (req.body.user_id || review.user_id);
        review.bar_id = (req.body.bar_id || review.bar_id);
        review.save();
        res.json(review);
    });
});

// Delete review
router.delete('/:id', function(req, res, next) {
    Review.findByIdAndDelete({_id: req.params.id}, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        res.json(review);
    });
});

module.exports = router;