const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  addMovie,
  searchMovies,
  sortMovies,
  importFromTMDB,   // 👈 ADD THIS
} = require("../controllers/movie.controller");

router.get("/", getAllMovies);
router.post("/", addMovie);

router.get("/search", searchMovies);
router.get("/sort", sortMovies);

// 🔥 THIS WAS MISSING
router.post("/import/tmdb", importFromTMDB);

module.exports = router;
