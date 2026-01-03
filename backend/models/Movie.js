const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    rating: Number,
    year: Number,
    runtime: Number,
    poster: String

  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
