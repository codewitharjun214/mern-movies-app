const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    rating: Number,
    duration: Number,
    releaseDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
