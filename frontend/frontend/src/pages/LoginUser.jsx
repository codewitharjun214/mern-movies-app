import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    nav("/movies");
  };

  return (
    <div className="card">
      <h2>Login Page</h2>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
