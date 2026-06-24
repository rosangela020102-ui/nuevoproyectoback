import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/netflix_db";
    
    await mongoose.connect(mongoUri);
    console.log("🟢 Conectado con éxito a la base de datos MongoDB");
  } catch (error) {
    console.error("🔴 Error en la conexión a la DB:", error.message);
    process.exit(1); 
  }
};