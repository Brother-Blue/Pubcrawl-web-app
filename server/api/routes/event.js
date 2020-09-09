var Event = require('../models/event');
var express = require('express');

var router = express();

// Create new event
router.post('', function(req, res, next) {
    var event = new Event(req.body);
    event.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(event);
    })
})

// Read all events
// TODO: Doesn't work, fix
router.get('', function(req, res, next) {
    Event.find(function(err, events) {
        if (err) { return next(err); }
        res.json({"events": events});
    });
});

// Read event
// TODO: Doesn't work, fix
router.get('/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        res.json(event);
    });
});

// Update event
router.put('/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        event.title = req.body.title;
        event.description = req.body.description;
        event.startDate = req.body.startDate;
        event.endDate = req.body.endDate;
        event.created = req.body.created;
        event.bar_id = req.body.bar_id;
        event.save();
        res.json(event);
    });
});

// Partially update event
router.patch('/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        event.title = (req.body.title || event.title);
        event.description = (req.body.description || event.description);
        event.startDate = (req.body.startDate || event.startDate);
        event.endDate = (req.body.endDate || event.endDate);
        event.created = (req.body.created || event.created);
        event.bar_id = (req.body.bar_id || event.bar_id);
        event.save();
        res.json(event);
    });
});

// Delete event
router.delete('/:id', function(req, res, next) {
    Event.findByIdAndDelete({_id: req.params.id}, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        res.json(event);
    });
});

module.exports = router;