import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://postgres.vcrvbszinjnqrukoxrxn:Rossy2026Back@aws-0-eu-north-1.pooler.supabase.com:5432/postgres?sslmode=require&supavisor_session=true",
  },
});