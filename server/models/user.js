var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // TODO: install this in server directory, "npm install mongoose-unique-validator"
var Review = require('../models/review');
var Event = require('../models/event');

// Password hashing
var bcrypt = require('bcrypt'); // TODO: install this in server directory, "npm install bcrypt"
var SALT_WORK_FACTOR = 10;

// Create user schema
let UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    username: { type: String, unique: true, required: true, minlength: [4, 'Minimum allowed characters is 4'], maxlength: [15, 'Max allowed characters is 15'], trim: true, lowercase: true},
    password: { type: String, required: true, minlength: [6, 'Minimum allowed characters is 6'], maxlength: [128, 'Max allowed characters is 128'], trim: true },
    createdAt: { required: true, type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }, // Stores if user is email verified
    passwordResetToken: String, // Will be used to send password resets
    passwordResetExpires: Date, // Will be used to resend password resets
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Validates if new UserSchema is unique
UserSchema.plugin(uniqueValidator);

// Check hashing before saving
UserSchema.pre('save', function(next) {
    var user = this;

    // Only hash new or modified passwords
    if (!user.isModified('password')) return next();
    
    // Generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // Hash password with generated salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // Override password
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Cascade delete
UserSchema.pre('findOneAndDelete', function(next) {
    var id = this.getQuery()._id;
    Event.deleteMany(
        { users: id },
        { multi: true }
    ).exec();
    Review.updateMany(
        { users: id },
        { $set: { users: null } },
        { multi: true }
    ).exec();
    next();
});

// Compile model from UserSchema
module.exports = mongoose.model('users', UserSchema);