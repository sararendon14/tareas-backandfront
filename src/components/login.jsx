import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        { usuario, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
        padding: 0,
      }}
    >
      <form
        className="card"
        style={{
          minWidth: 340,
          maxWidth: 400,
          width: "100%",
          margin: "2em auto",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
          border: "none",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(6px)",
          borderRadius: 18,
        }}
        onSubmit={handleLogin}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#2563eb" />
            <path d="M12 6a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#fff" />
          </svg>
        </div>
        <h2 style={{ textAlign: "center", marginBottom: "1.2em", color: "#22223b", fontWeight: 700, letterSpacing: 1 }}>Bienvenido</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoFocus
          style={{ marginBottom: 14 }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 18 }}
        />
        <button
          type="submit"
          style={{ width: "100%", marginTop: 0, fontWeight: 600, fontSize: 18, letterSpacing: 1 }}
        >
          Ingresar
        </button>
        {error && (
          <div className="error" style={{ marginTop: "1em", textAlign: "center" }}>{error}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
