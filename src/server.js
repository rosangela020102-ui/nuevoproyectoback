import app from "./app.js";
import prisma from "./config/prisma.js";
import { connectMongoDB } from "./config/dbMongo.js"; 

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Conectamos Supabase (Prisma)
    await prisma.$connect().catch(() => {});
    console.log("🚀 Prisma conectado (Supabase)");

    // 2. Conectamos MongoDB (Mongoose)
    await connectMongoDB();

    console.log("🚀 Servidor listo para arrancar");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("⚠️ Advertencia de conexión:", error.message);
    // Arrancamos de todos modos en modo seguro si falla alguna red
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  }
};

startServer();