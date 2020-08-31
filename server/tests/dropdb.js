var mongoose = require('mongoose');

// Variables
var mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('Missing MONGODB_URI for dropping test database.');
    process.exit(1);
}

// Drop database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    mongoose.connection.db.dropDatabase(function () {
        console.log(`Dropped database: ${mongoURI}`);
        process.exit(0);
    });
});
