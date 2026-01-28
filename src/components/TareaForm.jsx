import React, { useState } from 'react';

export default function TareaForm({ onAdd }) {
  const [tarea, setTarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim()) {
      onAdd(tarea);
      setTarea("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={tarea}
          onChange={e => setTarea(e.target.value)}
          placeholder="Escribe una tarea..."
          required
          style={{ flex: 1 }}
        />
        <button type="submit" style={{ minWidth: 110 }}>Agregar</button>
      </div>
    </form>
  );
}
