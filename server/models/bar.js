var mongoose = require('mongoose');
var Reviews = require('./review.js')

// Create bar schema
let BarSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [1, 'Minimum length is 1'], maxlength: [25, 'Maximum length is 25.'] },
    latLong: { type: [Number], required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
    address: { type: String },
    photo: { type: String },
    averageRating: { type: Number }
}, {
    versionKey: false // Skip mongoose-version-key
});

BarSchema.pre('save', function(next) {
    var count = 0;
    var total = 0;
    if (this.reviews.length > 0) {
        for (let i = 0; i < this.reviews.length; i++) {
            Reviews.findById(this.reviews[i], function(err, review) {
                if (err) return next(err);
                total += review.averageRating;
                count++;
            })
        }
    }
    var avg = total / count;
    this.averageRating = Number(avg.toFixed(1));
});

// Compile model from BarSchema
module.exports = mongoose.model('bars', BarSchema);