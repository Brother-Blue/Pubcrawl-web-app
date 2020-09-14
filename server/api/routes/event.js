var Event = require('../models/event');
var express = require('express');

var router = express.Router();

// Create new event
router.post('', function(req, res, next) {
    var event = new Event(req.body);
    event.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(event);
    })
});

// Read all events
router.get('', function(req, res, next) {
    Event.find(function(err, events) {
        if (err) { return next(err); }
        res.status(200).json({"events": events});
    });
});

// Read event
router.get('/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        res.status(200).json(event);
    });
});

// Read all event bars
router.get('/:id/bars', function(req, res, next) {
    Event.findById(req.params.id).populate('bars').exec(function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        res.status(200).json(event.bars);
    })
});

// Read event user
router.get('/:id/users', function(req, res, next) {
    Event.findById(req.params.id).populate('users').exec(function(err, event ) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        res.status(200).json(event.users);
    })
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
        res.status(204).json(event);
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
        res.status(204).json(event);
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
        res.status(202).json(event);
    });
});

// Delete all events
router.delete('', function(req, res, next) {
    Event.deleteMany({}, function(err, event) {
        if (err) { return next(err)};
        if (event == null) { 
            return res.status(404).json({ message: 'No events found.'});
        }
        res.status(202).json({message: 'All events have been deleted.'});
    });
})

module.exports = router;