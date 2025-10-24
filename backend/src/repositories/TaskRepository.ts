import { type ITask, type TaskDocument, TaskModel } from "../models/Task";

export class TaskRepository {
  // Crea una nueva tarea en la BD
  async create(taskData: ITask): Promise<ITask> {
    const created = await TaskModel.create(taskData);
    return created.toJSON(); // Devuelve el objeto plano con id strings
  }

  // Obtiene todas las tareas
  async findAll(): Promise<ITask[]> {
    const tasks = await TaskModel.find();
    return tasks.map((t) => t.toJSON());
  }

  // Busca una tarea por ID
  async findById(id: string): Promise<ITask | null> {
    const task = await TaskModel.findById(id);
    return task ? task.toJSON() : null;
  }

  // Actualiza una tarea por ID
  async update(id: string, updateData: Partial<ITask>): Promise<ITask | null> {
    const updated = await TaskModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return updated ? updated.toJSON() : null;
  }

  // Elimina una tarea por ID
  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id);
    return result !== null;
  }
}
