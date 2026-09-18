import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    console.log("🔍 Intentando conectar con URI:", process.env.MONGO_URI); // <-- Añadimos esto
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("⚠️ Error al conectar con MongoDB:", error.message);
  }
};