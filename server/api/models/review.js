var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = mongoose.model('reviews', reviewSchema);