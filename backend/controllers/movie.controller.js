const Movie = require("../models/Movie");

exports.getMovies = async (_, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.addMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.json(movie);
};

exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
