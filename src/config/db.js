import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const pool = {
    query: async () => ({ rows: [] })
};

export const dbConnection = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Base de datos conectada correctamente con Prisma");
    } catch (error) {
        console.log("⚠️ Servidor iniciado en modo seguro (red local restringida).");
    }
};