import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const role = localStorage.getItem("role");
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <header className="header">
      <h2>🎬 AK Movies Hub</h2>
      <nav>
        <Link to="/movies">Movies</Link>
        {role === "admin" && <Link to="/add-movie">Add Movie</Link>}
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}
