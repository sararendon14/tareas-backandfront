import React, { useState, useEffect } from "react";
import api from "../api/api";
import TareaForm from "./TareaForm";


const Dashboard = () => {
  const [tareas, setTareas] = useState([]);

  
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/tareas", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTareas(response.data);
      } catch (error) {
        setTareas([]);
      }
    };
    fetchTareas();
  }, []);

  
  const agregarTarea = async (tareaTexto) => {
    try {
      const token = localStorage.getItem("token");
      const nuevaTarea = { titulo: tareaTexto, descripcion: "", completada: false };
      const response = await api.post(
        "/tareas",
        nuevaTarea,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      setTareas([...tareas, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="center" style={{ minHeight: "100vh", background: "var(--background)" }}>
      <div className="card" style={{ width: "100%", maxWidth: 500, margin: "2em auto", position: "relative" }}>
        <h2 style={{ textAlign: "center", color: "var(--primary-dark)" }}>Mis Tareas</h2>
        <TareaForm onAdd={agregarTarea} />
        <ul style={{ listStyle: "none", padding: 0, marginTop: "2em" }}>
          {tareas.map((t) => (
            <li key={t.id} style={{
              background: t.completada ? "#f0fdf4" : "#fff",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              marginBottom: "1em",
              padding: "1em 1.2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span style={{ fontWeight: 500 }}>{t.titulo}</span>
              <span style={{ color: t.completada ? "#15803d" : "#e11d48", fontSize: 20 }}>
                {t.completada ? "✔" : "❌"}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            marginTop: 24,
            background: "#e11d48",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            borderRadius: "var(--radius)",
            padding: "0.7em 0",
            boxShadow: "0 2px 8px rgba(225,29,72,0.07)",
            cursor: "pointer",
            letterSpacing: 1
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
