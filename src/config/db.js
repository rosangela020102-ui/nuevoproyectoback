import mongoose from 'mongoose';
import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

export const dbConnection = async () => {
  try {8
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`🚀 MongoDB conectado con éxito: ${conn.connection.host}`);

    await pool.query('SELECT NOW()');
    console.log('🚀 PostgreSQL (Supabase) conectado con éxito');

  } catch (error) {
    console.error(`❌ Error al conectar a las bases de datos: ${error.message}`);
    process.exit(1);
  }
};