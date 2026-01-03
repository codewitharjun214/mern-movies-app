import { useEffect, useState } from "react";
import api, {
  getAllMovies,
  searchMovies,
  sortMovies,
} from "../services/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const role = localStorage.getItem("role");

  // Load all movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getAllMovies();
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    }
  };

  // 🔍 SEARCH
  const handleSearch = async (value) => {
    setSearchText(value);

    if (value.trim() === "") {
      fetchMovies();
      return;
    }

    try {
      const res = await searchMovies(value);
      setMovies(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // 🔃 SORT
  const handleSort = async (value) => {
    if (!value) return;

    const [by, order] = value.split("-");

    try {
      const res = await sortMovies(by, order);
      setMovies(res.data);
    } catch (err) {
      console.error("Sort failed", err);
    }
  };

  // 🔥 ADMIN: Import movies from TMDB
  const importFromTMDB = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/movies/import/tmdb?page=1",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Imported ${res.data.inserted} movies`);
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to import movies");
    }
  };

  // 🗑️ ADMIN: Delete movie
  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Movie deleted successfully");
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Movies</h2>

      {/* 🔥 Admin Import Button */}
      {role === "admin" && (
        <button
          onClick={importFromTMDB}
          style={{
            padding: "8px 14px",
            marginBottom: "15px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Import Movies from TMDB
        </button>
      )}

      {/* Search & Sort Controls */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="rating-desc">Rating (High → Low)</option>
          <option value="rating-asc">Rating (Low → High)</option>
          <option value="year-desc">Year (New → Old)</option>
          <option value="year-asc">Year (Old → New)</option>
          <option value="runtime-desc">Duration (Long → Short)</option>
          <option value="runtime-asc">Duration (Short → Long)</option>
        </select>
      </div>

      {/* Movies List */}
      {movies.length === 0 && <p>No movies found.</p>}

      {movies.map((movie) => (
        <div
          key={movie._id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "5px",
          }}
        >
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <p>⭐ Rating: {movie.rating}</p>
          <p>📅 Year: {movie.year || "N/A"}</p>
          <p>⏱ Runtime: {movie.runtime} min</p>

          {/* 🗑️ Admin Delete Button */}
          {role === "admin" && (
            <button
              onClick={() => deleteMovie(movie._id)}
              style={{
                marginTop: "8px",
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movies;
