import { Schema, model, Document, Types } from "mongoose";

export interface ITask {
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "completada";
}
export interface TaskDocument extends ITask, Document {
  _id: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
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
    toJSON: {
      transform: (_doc, ret: any) => {
        if (ret._id) {
          ret.id = ret._id.toString();
          delete ret._id;
        }
        if ("__v" in ret) {
          delete ret.__v;
        }
      },
    },
  }
);

// Modelo de Mongoose
export const TaskModel = model<TaskDocument>("Task", taskSchema);
