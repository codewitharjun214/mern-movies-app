const Movie = require("../models/Movie");

// GET ALL MOVIES
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// SEARCH MOVIES
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// SORT MOVIES
exports.sortMovies = async (req, res) => {
  try {
    const { by, order } = req.query;

    const sortOrder = order === "desc" ? -1 : 1;

    const movies = await Movie.find().sort({
      [by]: sortOrder
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Sorting failed" });
  }
};
