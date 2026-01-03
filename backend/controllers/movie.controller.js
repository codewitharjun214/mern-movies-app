const axios = require("axios");
const Movie = require("../models/Movie");

// ✅ GET all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD movie (manual admin)
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Failed to add movie" });
  }
};

// ✅ DELETE movie (ADMIN)
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE movie id:", id); // 👈 DEBUG

    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(id);

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err.message); // 👈 IMPORTANT
    res.status(500).json({ message: "Failed to delete movie" });
  }
};


// ✅ SEARCH movies
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    const movies = await Movie.find({
      title: { $regex: q, $options: "i" },
    });

    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

// ✅ SORT movies
exports.sortMovies = async (req, res) => {
  try {
    const { by, order } = req.query;
    const sort = {};
    sort[by] = order === "asc" ? 1 : -1;

    const movies = await Movie.find().sort(sort);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Sort failed" });
  }
};

// 🔥 TMDB IMPORT (BULK ADD)
exports.importFromTMDB = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          page,
        },
      }
    );

    const movies = response.data.results;
    let inserted = 0;

    for (let m of movies) {
      const exists = await Movie.findOne({ title: m.title });
      if (exists) continue;

      await Movie.create({
        title: m.title,
        description: m.overview,
        rating: m.vote_average,
        runtime: 120,
        poster: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "",
      });

      inserted++;
    }

    res.json({
      message: "TMDB movies imported successfully",
      page,
      inserted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "TMDB import failed" });
  }
};
