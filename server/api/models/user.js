var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // TODO: install this in server directory, "npm install mongoose-unique-validator"
var Schema = mongoose.Schema;

// Create user schema
let userSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    username: { type: String, unique: true, required: true, min: 4, max: 12, trim: true, lowercase: true}, // TODO: add match for a valid username
    password: { type: String, required: true, min: 6, max: 12, trim: true }, // TODO: store hash password
    isVerified: { type: Boolean, default: false }, // Stores if user is email verified
    passwordResetToken: String, // Will be used to send password resets
    passwordResetExpires: Date, // Will be used to resend password resets
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    versionKey: false // Skip mongoose-version-key
});

// Validates if new userSchema is unique
userSchema.plugin(uniqueValidator);

// Compile model from userSchema
module.exports = mongoose.model('users', userSchema);