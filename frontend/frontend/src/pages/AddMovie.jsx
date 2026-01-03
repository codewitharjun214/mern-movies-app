import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/movies",
        {
          title: movie.title,
          description: movie.description,
          rating: Number(movie.rating),
          runtime: Number(movie.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie added successfully");
      navigate("/movies");
    } catch (err) {
      console.error(err);
      alert("Failed to add movie");
    }
  };

  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <h2>Add Movie (Admin)</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={movie.title}
            onChange={(e) =>
              setMovie({ ...movie, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={movie.description}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Rating"
            value={movie.rating}
            onChange={(e) =>
              setMovie({ ...movie, rating: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={movie.duration}
            onChange={(e) =>
              setMovie({ ...movie, duration: e.target.value })
            }
          />

          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
};

export default AddMovie;
