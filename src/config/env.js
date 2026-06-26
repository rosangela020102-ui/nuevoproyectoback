import dotenv from 'dotenv';
dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000
};