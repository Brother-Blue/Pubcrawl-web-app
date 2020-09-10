var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create review schema
let ReviewSchema = new Schema({
    rating: { type: Array, required: true, min: 0, max: 5 },
    comment: { type: String, maxlength: [140, 'Max allowed characters is 140'] }, // TODO: add profanity filter
    created: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bar: { type: Schema.Types.ObjectId, required: true, ref: 'Bar' }
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from ReviewSchema
module.exports = mongoose.model('reviews', ReviewSchema);