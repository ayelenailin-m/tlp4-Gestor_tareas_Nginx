import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "completada";
}

const taskSchema = new Schema<ITask>(
  {
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    estado: {
      type: String,
      enum: ["pendiente", "completada"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>("Task", taskSchema);
