const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  addMovie,
  searchMovies,
  sortMovies,
  importFromTMDB,
  deleteMovie, // 👈 ADD THIS
} = require("../controllers/movie.controller");

router.get("/", getAllMovies);
router.post("/", addMovie);

router.get("/search", searchMovies);
router.get("/sort", sortMovies);

// 🔥 TMDB bulk import
router.post("/import/tmdb", importFromTMDB);

// 🗑️ DELETE movie (ADMIN)
router.delete("/:id", deleteMovie);

module.exports = router;
