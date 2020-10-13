var mongoose = require('mongoose');

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
    var bar = this;
    var count = 0;
    var total = 0;
    for (let i = 0; i < reviews.length; i++) {
        total += reviews[i].averageRating;
        count++;
    }
    var avg = total / count;
    bar.averageRating = Number(avg.toFixed(1));
    console.log(bar.averageRating); // For testing purposes
});

// Compile model from BarSchema
module.exports = mongoose.model('bars', BarSchema);