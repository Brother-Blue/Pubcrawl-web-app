var Review = require('../models/review');
var express = require('express');

var router = express.Router();

// Create review
router.post('', function(req, res, next) {
    var review = new Review(req.body);
    review.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});

// Read review
router.get('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (!review) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        res.status(200).json(review);
    });
});

// Read all reviews
router.get('', function(req, res, next) {
    Review.find(function(err, reviews) {
        if (err) { return next(err); }
        res.status(200).json({"reviews": reviews});
    });
});

// Read review user
router.get('/:id/users', function(req, res, next) {
    Review.findById(req.params.id).populate('users').exec(function(err, review) {
        if (err) { return next(err); }
        if (!review) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        res.status(200).json(review.users);
    })
});

// Read review bar
router.get('/:id/bars', function(req, res, next){
    Review.findById(req.params.id).populate('bars').exec(function(err,review){
        if (err) { return next(err); }
        if (!review) {
            return res.status(404).json(
                {"message": "review not found"}
            )
        }
        res.status(200).json(review.bars);
    });
});

// Update review
router.put('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (!review) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        review.drinkQuality = req.body.drinkQuality;
        review.drinkPrice = req.body.drinkPrice;
        review.drinkQuality = req.body.drinkQuality;
        review.foodQuality = req.body.foodQuality;
        review.atmosphere = req.body.atmosphere;
        review.averageRating = req.body.averageRating;
        review.comment = req.body.comment;
        review.createdAt = req.body.createdAt;
        review.users = req.body.users;
        review.bars = req.body.bars;
        review.save();
        res.status(200).json(review);
    });
});

// Update review partially
router.patch('/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (!review) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        review.drinkQuality = (req.body.drinkQuality || review.drinkQuality);
        review.drinkPrice = (req.body.drinkPrice || review.drinkPrice);
        review.drinkQuality = (req.body.drinkQuality || review.drinkQuality);
        review.foodQuality = (req.body.foodQuality || review.foodQuality);
        review.atmosphere = (req.body.atmosphere || review.atmosphere);
        review.averageRating = (req.body.averageRating || review.averageRating);
        review.comment = (req.body.comment || review.comment);
        review.bars = (req.body.bars || review.createdAt);
        review.users = (req.body.users || review.users);
        review.bars = (req.body.bars || review.bars);
        review.save();
        res.status(200).json(review);
    });
});

// Delete review
router.delete('/:id', function(req, res, next) {
    Review.findByIdAndDelete({_id: req.params.id}, function(err, review) {
        if (err) { return next(err); }
        if (!review) {
            return res.status(404).json(
                {"message": "review not found"});
        }
        res.status(200).json(review);
    });
});

// Delete all reviews
router.delete('', function(req, res, next) {
    Review.deleteMany({}, function(err, review) {
        if (err) { return next(err)};
        if (!review) { 
            return res.status(404).json(
                {"message": "no reviews found"});
        }
        res.status(200).json(
            {"message": "all reviews have been deleted"});
    });
});

module.exports = router;