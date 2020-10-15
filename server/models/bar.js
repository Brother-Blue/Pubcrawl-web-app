var mongoose = require("mongoose");
var Review = require("./review.js");

// Create bar schema
let BarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    latLong: { type: [Number], required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    address: { type: String },
    photo: { type: String },
    averageRating: { type: Number, default: 0 },
  },
  {
    versionKey: false, // Skip mongoose-version-key
  }
);

BarSchema.pre("save", async function () {
  var bar = this;
  
  if (bar.reviews.length) {
    var reviews = await Review.find({ _id: { $in: bar.reviews } }).exec();

    var result = reviews.reduce((sum, current) => {
      sum += current.averageRating;
      return sum;
    }, 0);

    var average = result / reviews.length;
    bar.averageRating = Number(average.toFixed(1));
  } else bar.averageRating = 0;
});

// Compile model from BarSchema
module.exports = mongoose.model("bars", BarSchema);
