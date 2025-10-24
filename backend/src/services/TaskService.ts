import type { ITask } from "../models/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(titulo: string, descripcion: string): Promise<ITask> {
    // Validación básica
    if (!titulo.trim() || !descripcion.trim()) {
      throw new Error("Título y descripción son obligatorios");
    }

    const nuevaTarea: ITask = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado: "pendiente",
    };

    return await this.taskRepository.create(nuevaTarea);
  }

  async getAllTasks(): Promise<ITask[]> {
    return await this.taskRepository.findAll();
  }

  async updateTask(id: string, updateData: Partial<ITask>): Promise<ITask> {
    // Validar estado si se proporciona
    if (
      updateData.estado &&
      !["pendiente", "completada"].includes(updateData.estado)
    ) {
      throw new Error('Estado inválido. Use "pendiente" o "completada"');
    }

    const updated = await this.taskRepository.update(id, updateData);
    if (!updated) {
      throw new Error("Tarea no encontrada");
    }
    return updated;
  }

  async deleteTask(id: string): Promise<void> {
    const exists = await this.taskRepository.findById(id);
    if (!exists) {
      throw new Error("Tarea no encontrada");
    }

    const deleted = await this.taskRepository.delete(id);
    if (!deleted) {
      throw new Error("No se pudo eliminar la tarea");
    }
  }
}
