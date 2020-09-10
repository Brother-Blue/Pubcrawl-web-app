var mongoose = require('mongoose');

var TokenSchema = mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 7200} // Expires after 2 hours
}, {
    versionKey: false // Skip mongoose-version-key
});

// Compile model from TokenSchema
module.exports = mongoose.model('tokens', TokenSchema);