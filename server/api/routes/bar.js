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

// Read all bar reviews and filter by drinkQuality
router.get('/:id/reviews', function(req, res, next) {
    var filter = req.query.drinkQuality;
    var barID = mongoose.Types.ObjectId(req.params.id);
    Review.find({
        drinkQuality: filter, 
        bars: barID
    }, function(err, reviews) {
        if (err) { return res.status(500).json(
            {"message": "send this to the devs: ${err.message}"}); 
        }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by drinkPrice
router.get('/:id/reviews', function(req, res, next) {
    var filter = req.query.drinkPrice;
    var barID = mongoose.Types.ObjectId(req.params.id);
    Review.find({
        drinkPrice: filter, 
        bars: barID
    }, function(err, reviews) {
        if (err) { return res.status(500).json(
            {"message": "send this to the devs: ${err.message}"}); 
        }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by foodQuality
router.get('/:id/reviews', function(req, res, next) {
    var filter = req.query.foodQuality;
    var barID = mongoose.Types.ObjectId(req.params.id);
    Review.find({
        foodQuality: filter, 
        bars: barID
    }, function(err, reviews) {
        if (err) { return res.status(500).json(
            {"message": "send this to the devs: ${err.message}"}); 
        }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by atmosphere
router.get('/:id/reviews', function(req, res, next) {
    var filter = req.query.atmosphere;
    var barID = mongoose.Types.ObjectId(req.params.id);
    Review.find({
        atmosphere: filter, 
        bars: barID
    }, function(err, reviews) {
        if (err) { return res.status(500).json(
            {"message": "send this to the devs: ${err.message}"}); 
        }
        if (!reviews) { return res.status(404).json(
            {"message": "no reviews found"});
        }
        res.status(200).json(reviews);
    });
});

// Read all bar reviews and filter by averageRating
router.get('/:id/reviews', function(req, res, next) {
    var filter = req.query.averageRating;
    var barID = mongoose.Types.ObjectId(req.params.id);
    Review.find({
        averageRating: filter, 
        bars: barID
    }, function(err, reviews) {
        if (err) { return res.status(500).json(
            {"message": "send this to the devs: ${err.message}"}); 
        }
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