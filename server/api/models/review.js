var mongoose = require('mongoose');

// Create review schema
let ReviewSchema = new mongoose.Schema({
    rating: { type: Array, required: true, min: 0, max: 5 },
    comment: { type: String, maxlength: [140, 'Max allowed characters is 140'] }, // TODO: add profanity filter
    createdAt: { required: true, type: Date, default: Date.now },
    users: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    bars: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bars' }
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from ReviewSchema
module.exports = mongoose.model('reviews', ReviewSchema);