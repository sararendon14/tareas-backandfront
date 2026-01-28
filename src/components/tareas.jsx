import { useState, useEffect } from "react";
import { apiFetch, logout } from "../api/api";

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    fetchTareas();
  }, []);

  async function fetchTareas() {
    try {
      const data = await apiFetch("/tareas");
      setTareas(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function crearTarea(e) {
    e.preventDefault();
    try {
      await apiFetch("/tareas", {
        method: "POST",
        body: JSON.stringify({ titulo, descripcion }),
      });
      setTitulo("");
      setDescripcion("");
      fetchTareas();
    } catch (err) {
      console.error(err);
    }
  }

  async function eliminarTarea(id) {
    try {
      await apiFetch(`/tareas/${id}`, { method: "DELETE" });
      fetchTareas();
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleCompletar(tarea) {
    try {
      await apiFetch(`/tareas/${tarea.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...tarea, completada: !tarea.completada }),
      });
      fetchTareas();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Mis Tareas</h1>
      <button onClick={logout}>Cerrar sesión</button>

      <h2>Crear Tarea</h2>
      <form onSubmit={crearTarea}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.titulo} - {tarea.descripcion} -{" "}
            {tarea.completada ? "✔" : "❌"}
            <button onClick={() => toggleCompletar(tarea)}>
              {tarea.completada ? "Desmarcar" : "Completar"}
            </button>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
