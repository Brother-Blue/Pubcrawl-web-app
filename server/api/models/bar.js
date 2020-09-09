var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create bar schema
let barSchema = new Schema({
    name: { type: String, required: true, min: 1, max: 25 },
    latLong: { type: [Number], required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from barSchema
module.exports = mongoose.model('bars', barSchema);