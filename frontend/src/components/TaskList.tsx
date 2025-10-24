import React, { useEffect, useState } from "react";
import type { Task } from "../types/task";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (titulo: string, descripcion: string) => {
    const created = await createTask(titulo, descripcion);
    setTasks((s) => [created, ...s]);
  };

  const handleToggle = async (id: string, nuevoEstado: Task["estado"]) => {
    const updated = await updateTask(id, { estado: nuevoEstado });
    setTasks((s) => s.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((s) => s.filter((t) => t.id !== id));
  };

  const pendientes = tasks.filter((t) => t.estado === "pendiente");
  const completadas = tasks.filter((t) => t.estado === "completada");

  return (
    <section className="space-y-6">
      <TaskForm onSubmit={handleCreate} />

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
          <p className="text-danger font-medium">{error}</p>
        </div>
      )}

      {!loading && tasks.length === 0 && (
        <div className="text-center py-16 bg-surface/50 rounded-xl border border-primary/10">
          <svg
            className="w-16 h-16 mx-auto text-text-muted mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <p className="text-text-muted text-lg">No hay tareas aún</p>
          <p className="text-text-muted/60 text-sm mt-1">
            Crea tu primera tarea para comenzar
          </p>
        </div>
      )}

      {pendientes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Pendientes ({pendientes.length})
          </h2>
          <ul className="space-y-3">
            {pendientes.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {completadas.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            Completadas ({completadas.length})
          </h2>
          <ul className="space-y-3">
            {completadas.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
