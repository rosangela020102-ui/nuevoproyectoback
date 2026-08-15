import pkg from "pg";
const { Pool } = pkg;
import prisma from "./prisma.js";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const dbConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Base de datos (Supabase/PostgreSQL) conectada correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    process.exit(1);
  }
};