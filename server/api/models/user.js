var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); // TODO: install this in server directory, "npm install mongoose-unique-validator"
var Schema = mongoose.Schema;


// Create user schema
let userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
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