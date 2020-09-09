var Review = require('../models/review');
var express = require('express');

var router = express.Router();

// Create new review
router.post('', function(req, res, next) {
    var review = new Review(req.body);
    review.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
})

// Read all reviews
router.get('', function(req, res, next) {
    Review.find(function(err, reviews) {
        if (err) { return next(err); }
        res.status(200).json({"reviews": reviews});
    });
});

// Read review
router.get('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        res.status(200).json(review);
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
        res.status(204).json(review);
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
        res.status(204).json(review);
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
        res.status(202).json(review);
    });
});

module.exports = router;