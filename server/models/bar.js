var mongoose = require('mongoose');
var Review = require('./review.js')

// Create bar schema
let BarSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [1, 'Minimum length is 1'], maxlength: [25, 'Maximum length is 25.'] },
    latLong: { type: [Number], required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
    address: { type: String },
    photo: { type: String },
    averageRating: { type: Number, default: 0 }
}, {
    versionKey: false // Skip mongoose-version-key
});

BarSchema.pre('save', async function(next) {
    var bar = this;

    if (bar.reviews.length > 0) {
        bar.averageRating = 0;
        var avg = 0;
        var divide = 0;

        for (let i = 0; i < bar.reviews.length; i++) {
            await Review.findById(bar.reviews[i], async function(err, review) {
                avg += review.averageRating;
                divide++;
            })
        }
        avg /= divide;
        bar.averageRating =  Number(avg.toFixed(1));
    }
    next();
});

// Compile model from BarSchema
module.exports = mongoose.model('bars', BarSchema);