var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create event schema
let eventSchema = new Schema({
    title: { type: String, required: true, max: 30 },
    description: { type: String, max: 280 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    created: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bars: [{ type: Schema.Types.ObjectId, ref: 'Bar' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from eventSchema
module.exports = mongoose.model('events', eventSchema);