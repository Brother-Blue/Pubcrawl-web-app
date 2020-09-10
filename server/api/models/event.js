var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create event schema
let EventSchema = new Schema({
    title: { type: String, required: true, maxlength: [30, 'Max allowed characters is 30'] },
    description: { type: String, maxlength: [280, 'Max allowed character is 280'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    created: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bars: [{ type: Schema.Types.ObjectId, ref: 'Bar' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from EventSchema
module.exports = mongoose.model('events', EventSchema);