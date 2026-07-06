import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://postgres.vcrvbszinjnqrukoxrxn:Rossy2026Back@db.vcrvbszinjnqrukoxrxn.supabase.co:5432/postgres?sslmode=require&connect_timeout=30",
  },
});