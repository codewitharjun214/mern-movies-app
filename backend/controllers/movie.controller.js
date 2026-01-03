const axios = require("axios");
const Movie = require("../models/Movie");

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
        runtime: 120, // TMDB popular API doesn't provide runtime
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
    console.error(err.message);
    res.status(500).json({ message: "TMDB import failed" });
  }
};
