const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  searchMovies,
  sortMovies
} = require("../controllers/movie.controller");

router.get("/", getAllMovies);
router.get("/search", searchMovies);
router.get("/sort", sortMovies);

module.exports = router;
