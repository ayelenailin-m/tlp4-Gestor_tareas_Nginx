import React, { useState } from "react";

interface Props {
  onSubmit: (titulo: string, descripcion: string) => Promise<void>;
}

export const TaskForm: React.FC<Props> = ({ onSubmit }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    setLoading(true);
    try {
      await onSubmit(titulo, descripcion);
      setTitulo("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al crear tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-primary/20 rounded-xl p-6 shadow-xl shadow-primary/5"
    >
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Nueva Tarea
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Título
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            required
            className="w-full bg-background border border-primary/30 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Agrega más detalles..."
            rows={3}
            className="w-full bg-background border border-primary/30 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !titulo.trim()}
          className="w-full bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-text-primary font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
        >
          {loading ? "Creando..." : "Crear Tarea"}
        </button>
      </div>
    </form>
  );
};
