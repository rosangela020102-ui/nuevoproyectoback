import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Base de datos (Supabase/PostgreSQL) conectada correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    process.exit(1);
  }
};

startServer();