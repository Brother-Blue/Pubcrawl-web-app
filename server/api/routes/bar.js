var Bar = require('../models/bar');
var Review = require('../models/review');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

// Create bar
router.post('', function(req, res, next) {
    var bar = new Bar(req.body);
    bar.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(bar);
    })
});

// Read bar
router.get('/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (!bar) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        res.status(200).json(bar);
    });
});

// Read all bars
router.get('', function(req, res, next) {
    Bar.find(function(err, bars) {
        if (err) { return next(err); }
        res.status(200).json({"bars": bars});
    });
});

// TODO: Sort by bar name
// TODO: Sort by bar drinkQuality
// TODO: Sort by bar drinkPrice
// TODO: Sort by bar foodQuality
// TODO: Sort by bar atmosphere
// TODO: Sort by bar averageRating

// TODO: Filter by bar name

router.get('/:id/reviews', function (req, res, next) {
    var drinkQualityFilter = req.query.drinkQuality;
    var drinkPriceFilter = req.query.drinkPrice;
    var foodQualityFilter = req.query.foodQuality;
    var atmosphereFilter = req.query.atmosphere;
    var barID = mongoose.Types.ObjectId(req.params.id);
    
    if (drinkQualityFilter) { // Filter reviews by drink quality rating
        Review.find({
            drinkQuality: drinkQualityFilter,
            bars: barID
        }, function (err, reviews) {
            if (err) { return res.status(500).json({'message': `Send this message to the dev team ${err.message}`}); }
            if (!reviews) { return res.status(404).json({'message': 'reviews not found'}); }
            res.status(200).json({'reviews': reviews});
        });
    } else if (drinkPriceFilter) { // Filter reviews by drink price rating
        Review.find({
            drinkPrice: drinkPriceFilter,
            bars: barID
        }, function (err, reviews) {
            if (err) { return res.status(500).json({'message': `Send this message to the dev team ${err.message}`}); }
            if (!reviews) { return res.status(404).json({'message': 'reviews not found'}); }
            res.status(200).json({'reviews': reviews});
        });
    } else if (foodQualityFilter) { // Filter reviews by food quality rating
        Review.find({
            foodQuality: foodQualityFilter,
            bars: barID
        }, function (err, reviews) {
            if (err) { return res.status(500).json({'message': `Send this message to the dev team ${err.message}`}); }
            if (!reviews) { return res.status(404).json({'message': 'reviews not found'}); }
            res.status(200).json({'reviews': reviews});
        });
    } else if (atmosphereFilter) { // Filter reviews by atmosphere rating
        Review.find({
            atmosphereFilter: atmosphereFilter,
            bars: barID
        }, function (err, reviews) {
            if (err) { return res.status(500).json({'message': `Send this message to the dev team ${err.message}`}); }
            if (!reviews) { return res.status(404).json({'message': 'reviews not found'}); }
            res.status(200).json({'reviews': reviews});
        });
    } else {
        Bar.findById(req.params.id).populate('reviews').exec(function(err, bar) { // If no filter return all reviews
            if (err) { return next(err); }
            if (!bar) {
                return res.status(404).json(
                    {"message": "bar not found"});
            }
            res.status(200).json(bar.reviews);
        })
    }
})

// Update bar
router.put('/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (!bar) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        bar.name = req.body.name;
        bar.latLong = req.body.latLong;
        bar.reviews = req.body.reviews;
        bar.save();
        res.status(204).json(bar);
    });
});

// Update bar partially
router.patch('/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (!bar) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        bar.name = (req.body.name || bar.name);
        bar.latLong = (req.body.latLong || bar.latLong);
        bar.reviews = (req.body.reviews || bar.reviews);
        bar.save();
        res.status(204).json(bar);
    });
});

// Delete bar
router.delete('/:id', function(req, res, next) {
    Bar.findByIdAndDelete({_id: req.params.id}, function(err, bar) {
        if (err) { return next(err); }
        if (!bar) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        res.status(202).json(bar);
    });
});

// Delete all bars
router.delete('', function(req, res, next) {
    Bar.deleteMany({}, function(err, bar) {
        if (err) { return next(err)};
        if (!bar) { 
            return res.status(404).json(
                {"message": "no bars found"});
        }
        res.status(202).json(
            {"message": "all bars have been deleted"});
    });
});

module.exports = router;