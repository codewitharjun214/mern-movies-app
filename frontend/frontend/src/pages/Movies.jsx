import api from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get("/movies").then((res) => setMovies(res.data));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      {movies.map((m) => (
        <div key={m._id} className="movie">
          {m.title} ⭐ {m.rating}
          {role === "admin" && <Link to={`/edit/${m._id}`}> Edit</Link>}
        </div>
      ))}
    </div>
  );
}
