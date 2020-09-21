var Event = require('../models/event');
var express = require('express');

var router = express.Router();

// Create event
router.post('', function(req, res, next) {
    var event = new Event(req.body);
    event.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(event);
    })
});

// Read event
router.get('/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (!event) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        res.status(200).json(event);
    });
});

// Sort by event startDate
router.get('', function(req, res, next) {
    if (!req.query.sortByStartDate){return next();}
    Event.find({}).sort({
        startDate: req.query.sortByStartDate
    }).exec(function(err,results){
        if(err) { return next(err)}
        if(!results) {return res.status(404).json({"message": "no events found"})}
        res.status(200).json(results);
    })
});

// Read all events and partially filter by title
router.get('', function(req, res, next) {   
    if (!req.query.title){return next();}
    Event.find({
        title: { $regex: req.query.title, $options: "i" }
    },
        function(err, events) {
            if (err) { return next(err); }
            if (!events) { return res.status(404).json(
                {"message": "no events found"});
            }
        res.status(200).json(events);
    });
});

// Read all events and partially filter by description
router.get('', function(req, res, next) {   
    if (!req.query.description){return next();}
    Event.find({
        description: { $regex: req.query.description, $options: "i" }
    },
        function(err, events) {
            if (err) { return next(err); }
            if (!events) { return res.status(404).json(
                {"message": "no events found"});
            }
        res.status(200).json(events);
    });
});

// Read all events
router.get('', function(req, res, next) {
    Event.find(function(err, events) {
        if (err) { return next(err); }
        res.status(200).json({"events": events});
    });
});

// Read all event bars
router.get('/:id/bars', function(req, res, next) {
    Event.findById(req.params.id).populate('bars').exec(function(err, event) {
        if (err) { return next(err); }
        if (!event) {
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
        if (!event) {
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
        if (!event) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        event.title = req.body.title;
        event.description = req.body.description;
        event.startDate = req.body.startDate;
        event.endDate = req.body.endDate;
        event.created = req.body.created;
        event.bars = req.body.bars;
        event.users = req.body.users;
        event.save();
        res.status(204).json(event);
    });
});

// Update event partially
router.patch('/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (!event) {
            return res.status(404).json(
                {"message": "event not found"});
        }
        event.title = (req.body.title || event.title);
        event.description = (req.body.description || event.description);
        event.startDate = (req.body.startDate || event.startDate);
        event.endDate = (req.body.endDate || event.endDate);
        event.created = (req.body.created || event.created);
        event.bars = (req.body.bars || event.bars);
        event.users = (req.body.users || event.users);
        event.save();
        res.status(204).json(event);
    });
});

// Delete event
router.delete('/:id', function(req, res, next) {
    Event.findByIdAndDelete({_id: req.params.id}, function(err, event) {
        if (err) { return next(err); }
        if (!event) {
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
        if (!event) { 
            return res.status(404).json(
                {"message": "no events found"});
        }
        res.status(202).json(
            {"message": "all events have been deleted"});
    });
})

module.exports = router;