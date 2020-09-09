var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create bar schema
let barSchema = new Schema({
    name: { type: String, required: true, minlength: [1, "Minimum length is 1"], maxlength: [25, "Maximum length is 25."] },
    latLong: { type: [Number], required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from barSchema
module.exports = mongoose.model('bars', barSchema);