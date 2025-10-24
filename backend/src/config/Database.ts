import mongoose from "mongoose";
import { config } from "dotenv";

config();

export class Database {
  private static instance: Database;
  private isConnected = false;

  // Constructor privado para evitar instanciación externa
  private constructor() {}

  // garantiza una única instancia
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // conectar a MongoDB
  public async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      this.isConnected = true;
      console.log("MongoDB conectado");
    } catch (error) {
      console.error("Error al conectar a MongoDB:", error);
      process.exit(1);
    }
  }
}
