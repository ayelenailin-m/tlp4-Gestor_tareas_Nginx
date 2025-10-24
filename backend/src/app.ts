import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/tasks", taskRoutes);

app.get("/", (_req, res) => {
  res.json({ status: "Gestor de Tareas API - Anda" });
});

export default app;
