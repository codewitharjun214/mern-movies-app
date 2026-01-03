const Movie = require("../models/Movie");

// GET all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD movie (ADMIN)
exports.addMovie = async (req, res) => {
  try {
    const { title, description, rating, runtime } = req.body;

    const movie = new Movie({
      title,
      description,
      rating,
      runtime,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add movie" });
  }
};

// SEARCH movies
exports.searchMovies = async (req, res) => {
  const { q } = req.query;
  const movies = await Movie.find({
    title: { $regex: q, $options: "i" },
  });
  res.json(movies);
};

// SORT movies
exports.sortMovies = async (req, res) => {
  const { by, order } = req.query;
  const sort = {};
  sort[by] = order === "asc" ? 1 : -1;
  const movies = await Movie.find().sort(sort);
  res.json(movies);
};
