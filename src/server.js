import app from "./app.js";
import { env } from "./config/env.js";
import { dbConnection } from "./config/db.js";

const PORT = env.PORT || 3000;

dbConnection();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});