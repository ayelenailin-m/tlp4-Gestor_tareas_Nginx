import app from "./app";
import { Database } from "./config/Database";

const PORT = process.env.PORT || 3000;

const db = Database.getInstance();
db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
