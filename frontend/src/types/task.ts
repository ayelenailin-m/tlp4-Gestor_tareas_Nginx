export type TaskState = "pendiente" | "completada";

export interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  estado: TaskState;
}
