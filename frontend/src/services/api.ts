import type { Task } from "../types/task";

const BASE = "/api/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return await res.json();
}

export async function createTask(
  titulo: string,
  descripcion: string
): Promise<Task> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Error al crear tarea");
  }
  return await res.json();
}

export async function updateTask(
  id: string,
  updateData: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Error al actualizar tarea");
  }
  return await res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Error al eliminar tarea");
  }
}
