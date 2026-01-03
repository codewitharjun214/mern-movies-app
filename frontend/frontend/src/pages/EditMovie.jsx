import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
  });

  useEffect(() => {
    api.get("/movies").then(res => {
      const found = res.data.find(m => m._id === id);
      if (found) setMovie(found);
    });
  }, [id]);

  const updateMovie = async (e) => {
    e.preventDefault();
    await api.put(`/movies/${id}`, movie);
    alert("Movie updated");
    navigate("/movies");
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Edit Movie</h2>

      <form onSubmit={updateMovie}>
        <input value={movie.title}
          onChange={e => setMovie({ ...movie, title: e.target.value })}
          placeholder="Title" />

        <input value={movie.description}
          onChange={e => setMovie({ ...movie, description: e.target.value })}
          placeholder="Description" />

        <input value={movie.rating}
          onChange={e => setMovie({ ...movie, rating: e.target.value })}
          placeholder="Rating" />

        <input value={movie.duration}
          onChange={e => setMovie({ ...movie, duration: e.target.value })}
          placeholder="Duration" />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditMovie; // ✅ ONLY ONE export
