import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.user.role !== "user") {
        alert("Not a user");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");

      nav("/movies");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>User Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {/* 👇 ADD THIS */}
      <p style={{ marginTop: "10px" }}>
        Are you an admin?{" "}
        <span
          style={{ color: "cyan", cursor: "pointer" }}
          onClick={() => nav("/admin")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}
