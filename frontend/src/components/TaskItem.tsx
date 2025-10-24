import React from "react";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onToggle: (id: string, nuevoEstado: Task["estado"]) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.estado === "completada";

  return (
    <li
      className={`group bg-surface border transition-all duration-300 rounded-xl p-5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${
        isCompleted ? "border-success/20 bg-success/5" : "border-primary/20"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() =>
            onToggle(
              task.id,
              task.estado === "pendiente" ? "completada" : "pendiente"
            )
          }
          className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
            isCompleted
              ? "bg-success border-success shadow-lg shadow-success/30"
              : "border-primary hover:border-primary-light hover:bg-primary/10"
          }`}
        >
          {isCompleted && (
            <svg
              className="w-4 h-4 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-1 transition-all ${
              isCompleted ? "text-text-muted line-through" : "text-text-primary"
            }`}
          >
            {task.titulo}
          </h3>
          <p
            className={`text-sm mb-2 transition-all ${
              isCompleted
                ? "text-text-muted/60 line-through"
                : "text-text-secondary"
            }`}
          >
            {task.descripcion}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                isCompleted
                  ? "bg-success/20 text-success border border-success/30"
                  : "bg-primary/20 text-primary-light border border-primary/30"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? "bg-success" : "bg-primary-light"
                }`}
              ></span>
              {task.estado}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() =>
              onToggle(
                task.id,
                task.estado === "pendiente" ? "completada" : "pendiente"
              )
            }
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isCompleted
                ? "bg-primary/20 text-primary-light hover:bg-primary/30 border border-primary/30"
                : "bg-success/20 text-success hover:bg-success/30 border border-success/30"
            }`}
          >
            {task.estado === "pendiente" ? "Completar" : "Reabrir"}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-danger/20 text-danger hover:bg-danger/30 border border-danger/30 transition-all duration-300"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};
