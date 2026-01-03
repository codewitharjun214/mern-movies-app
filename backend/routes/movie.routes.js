const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  addMovie,
  searchMovies,
  sortMovies,
} = require("../controllers/movie.controller");

router.get("/", getAllMovies);
router.post("/", addMovie); // 👈 ADD THIS
router.get("/search", searchMovies);
router.get("/sort", sortMovies);

module.exports = router;
