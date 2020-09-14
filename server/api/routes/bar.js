var Bar = require('../models/bar');
var express = require('express');

var router = express.Router();

// Create new bar
router.post('', function(req, res, next) {
    var bar = new Bar(req.body);
    bar.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(bar);
    })
});

// Read all bars
router.get('', function(req, res, next) {
    Bar.find(function(err, bars) {
        if (err) { return next(err); }
        res.status(200).json({"bars": bars});
    });
});

// Read bar
router.get('/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        res.status(200).json(bar);
    });
});

// Filter by bar drinkQuality reviews
router.get('/:id/reviews', function(req, res, next) {
    var filter = req.query.drinkQuality;
    console.log('Hello from pong'+filter);
    Bar.findById(req.params.id).populate('reviews').exec(function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json(
                {"message": "bar not found"});
        }
        if (filter) {
            res.json(bar.filter(function (e) {
                console.log('Pong!');
                return filter === e.drinkQuality;
            }));
        } else {
            res.status(200).json(bar.reviews);
        }
    })
});

// TODO: Filter by bar averageRating reviews
// TODO: Filter by bar drinkPrice reviews
// TODO: Filter by bar foodQuality reviews
// TODO: Filter by bar atmosphere reviews

// TODO: Sort by bar averageRating reviews
// TODO: Sort by bar drinkPrice reviews
// TODO: Sort by bar foodQuality reviews
// TODO: Sort by bar atmosphere reviews

// TODO: Search by bar name

// Read all bar reviews
router.get('/:id/reviews', function(req, res, next) {
    Bar.findById(req.params.id).populate('reviews').exec(function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
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
        if (bar == null) {
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

// Partially update bar
router.patch('/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
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
        if (bar == null) {
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
        if (bar == null) { 
            return res.status(404).json({ message: 'No bars found.'});
        }
        res.status(202).json({message: 'All bars have been deleted.'});
    });
});

module.exports = router;