import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Intentamos conectar, pero no matamos el servidor si la red local bloquea el puerto de prueba
    await prisma.$connect().catch(() => {});
    console.log("🚀 Servidor listo para arrancar");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("⚠️ Advertencia de conexión:", error.message);
    // Arrancamos de todos modos para que la API HTTP y las rutas sigan funcionando
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  }
};

startServer();