var mongoose = require('mongoose');

// Create event schema
let EventSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: [30, 'Max allowed characters is 30'] },
    description: { type: String, maxlength: [280, 'Max allowed character is 280'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { required: true, type: Date, default: Date.now },
    users: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    bars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bars' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from EventSchema
module.exports = mongoose.model('events', EventSchema);