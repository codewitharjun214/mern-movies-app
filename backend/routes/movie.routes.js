const router = require("express").Router();
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

router.get("/", protect, getMovies);
router.post("/", protect, adminOnly, addMovie);
router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);

module.exports = router;
