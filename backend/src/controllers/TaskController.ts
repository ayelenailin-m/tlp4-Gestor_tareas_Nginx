// Controlador: traduce solicitudes HTTP a llamadas al servicio
import type { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descripcion } = req.body;
      const task = await this.taskService.createTask(titulo, descripcion);
      res.status(201).json(task);
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message || "Error al crear tarea" });
    }
  }

  async getAllTasks(_req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: "Error al obtener tareas" });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "ID de tarea es requerido" });
      return;
    }

    try {
      const updateData = req.body;
      const task = await this.taskService.updateTask(id, updateData);
      res.status(200).json(task);
    } catch (error: any) {
      if (error.message.includes("no encontrada")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID de tarea es requerido" });
      return;
    }

    try {
      await this.taskService.deleteTask(id);
      res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error: any) {
      if (error.message.includes("no encontrada")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al eliminar tarea" });
      }
    }
  }
}
