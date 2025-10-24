import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/tasks", taskRoutes);

app.get("/", (_req, res) => {
  res.json({ status: "Gestor de Tareas API - Anda" });
});

export default app;
