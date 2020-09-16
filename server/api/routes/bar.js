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

// TODO: Sort by bar name
// TODO: Sort by bar drinkQuality
// TODO: Sort by bar drinkPrice
// TODO: Sort by bar foodQuality
// TODO: Sort by bar atmosphere
// TODO: Sort by bar averageRating

// Read all bars and filter by name
router.get('', function(req, res, next) {   
    if (!req.query.name){return next();}
    Bar.find({
        name: { $regex: req.query.name, $options: "i" }
    },
        function(err, bars) {
            if (err) { return next(err); }
            if (!bars) { return res.status(404).json(
                {"message": "no reviews found"});
            }
        res.status(200).json(bars);
    });
});

// Read all bars
router.get('', function(req, res, next) {
    Bar.find(function(err, bars) {
        if (err) { return next(err); }
        res.status(200).json({"bars": bars});
    });
});

// Read all bar reviews and filter by drinkQuality
router.get('/:id/reviews', function(req, res, next) {
    if(!req.query.drinkQuality) { return next(); }
    Review.find({
        drinkQuality: req.query.drinkQuality, 
        bars: mongoose.Types.ObjectId(req.params.id)
    }, function(err, reviews) {
        if (err) { return next(err); }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by drinkPrice
router.get('/:id/reviews', function(req, res, next) {
    if(!req.query.drinkPrice) { return next(); }
    Review.find({
        drinkPrice: req.query.drinkPrice, 
        bars: mongoose.Types.ObjectId(req.params.id)
    }, function(err, reviews) {
        if (err) { return next(err); }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by foodQuality
router.get('/:id/reviews', function(req, res, next) {
    if(!req.query.foodQuality) { return next(); }
    Review.find({
        foodQuality: req.query.foodQuality, 
        bars: mongoose.Types.ObjectId(req.params.id)
    }, function(err, reviews) {
        if (err) { return next(err); }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by atmosphere
router.get('/:id/reviews', function(req, res, next) {
    if(!req.query.atmosphere) { return next(); }
    Review.find({
        atmosphere: req.query.atmosphere, 
        bars: mongoose.Types.ObjectId(req.params.id)
    }, function(err, reviews) {
        if (err) { return next(err); }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by averageRating
router.get('/:id/reviews', function(req, res, next) {
    if(!req.query.averageRating) { return next(); }
    Review.find({
        averageRating: req.query.averageRating, 
        bars: mongoose.Types.ObjectId(req.params.id)
    }, function(err, reviews) {
        if (err) { return next(err); }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews
router.get('/:id/reviews', function(req, res, next) {
    Bar.findById(req.params.id).populate('reviews').exec(function(err, bar) {
        if (err) { return next(err); }
        if (!bar) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        res.status(200).json(bar.reviews);
    })
});

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