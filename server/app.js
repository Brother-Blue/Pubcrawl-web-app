var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // TODO: install this in server directory, "npm install mongoose-unique-validator"
var Schema = mongoose.Schema;
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://g20admin:12345@cluster0.mw6yd.mongodb.net/pubcrawl?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Create user schema
let userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false }, // Stores if user is email verified
    passwordResetToken: String, // Will be used to send password resets
    passwordResetExpires: Date, // Will be used to resend password resets
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Validates if new userSchema is unique
userSchema.plugin(uniqueValidator);

// Compile model from userSchema
var User = mongoose.model('users', userSchema);

// Create review schema
let reviewSchema = new Schema({
    rating: { type: Array, required: true },
    comment: String,
    created: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bar: { type: Schema.Types.ObjectId, required: true, ref: 'Bar' }
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from reviewSchema
var Review = mongoose.model('reviews', reviewSchema);

// Create event schema
let eventSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    created: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bars: [{ type: Schema.Types.ObjectId, ref: 'Bar' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from eventSchema
var Event = mongoose.model('events', eventSchema);

// Create bar schema
let barSchema = new Schema({
    name: { type: String, required: true },
    latLong: { type: [Number], required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from barSchema
var Bar = mongoose.model('bars', barSchema);

// Create new user
app.post('/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
})

// Create new review
app.post('/reviews', function(req, res, next) {
    var review = new Review(req.body);
    review.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
})

// Create new event
app.post('/events', function(req, res, next) {
    var event = new Event(req.body);
    event.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(event);
    })
})

// Create new bar
app.post('/bars', function(req, res, next) {
    var bar = new Bar(req.body);
    bar.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(bar);
    })
})

// Read all users
app.get('/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({"users": users});
    });
});

// Read all reviews
app.get('/reviews', function(req, res, next) {
    Review.find(function(err, reviews) {
        if (err) { return next(err); }
        res.json({"reviews": reviews});
    });
});

// Read all events
app.get('/events', function(req, res, next) {
    Event.find(function(err, events) {
        if (err) { return next(err); }
        res.json({"events": events});
    });
});

// Read all bars
app.get('/bars', function(req, res, next) {
    Bar.find(function(err, bars) {
        if (err) { return next(err); }
        res.json({"bars": bars});
    });
});

// Read user
app.get('/users/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        res.json(user);
    });
});

// Read review
app.get('/reviews/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
        }
        res.json(review);
    });
});

// Read event
app.get('/events/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "Event not found"});
        }
        res.json(event);
    });
});

// Read bar
app.get('/bars/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json(
                {"message": "Bar not found"});
        }
        res.json(Bar);
    });
});

// Update user
app.put('/users/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.isVerified = req.body.isVerified;
        user.passwordResetToken = req.body.passwordResetToken;
        user.passwordResetExpires = req.body.passwordResetExpires
        user.save();
        res.json(user);
    });
});

// Partially update user
app.patch('/users/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        user.email = (req.body.email || user.email);
        user.username = (req.body.username || user.username);
        user.password = (req.body.password || user.password);
        user.isVerified = (req.body.isVerified || user.isVerified);
        user.passwordResetToken = (req.body.passwordResetToken || user.passwordResetToken);
        user.passwordResetExpires = (req.body.passwordResetExpires || user.passwordResetExpires);
        user.save();
        res.json(user);
    });
});

// Update review
app.put('/reviews/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
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
app.patch('/reviews/:id', function(req, res, next) {
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
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

// Update event
app.put('/events/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "Event not found"});
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
app.patch('/events/:id', function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "Event not found"});
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

// Update bar
app.put('/bars/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json(
                {"message": "Bar not found"});
        }
        bar.name = req.body.name;
        bar.latLong = req.body.latLong;
        bar.save();
        res.json(bar);
    });
});

// Partially update bar
app.patch('/bars/:id', function(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json(
                {"message": "Bar not found"});
        }
        bar.name = (req.body.name || bar.name);
        bar.latLong = (req.body.latLong || bar.latLong);
        bar.save();
        res.json(bar);
    });
});

// Delete user
app.delete('/users/:id', function(req, res, next) {
    User.findByIdAndDelete({_id: req.params.id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        res.json(user);
    });
});

// Delete review
app.delete('/reviews/:id', function(req, res, next) {
    Review.findByIdAndDelete({_id: req.params.id}, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
        }
        res.json(review);
    });
});

// Delete event
app.delete('/events/:id', function(req, res, next) {
    Event.findByIdAndDelete({_id: req.params.id}, function(err, event) {
        if (err) { return next(err); }
        if (event == null) {
            return res.status(404).json(
                {"message": "Event not found"});
        }
        res.json(event);
    });
});

// Delete bar
app.delete('/bars/:id', function(req, res, next) {
    Bar.findByIdAndDelete({_id: req.params.id}, function(err, bar) {
        if (err) { return next(err); }
        if (bar == null) {
            return res.status(404).json(
                {"message": "Bar not found"});
        }
        res.json(bar);
    });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
