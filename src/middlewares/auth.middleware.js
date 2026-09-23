import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js"; // 1. Importa prisma aquí

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "No autorizado, falta token" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Consultar el usuario real directamente en Prisma
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true } // O los campos que necesites
    });

    if (!user) {
      return res.status(401).json({ success: false, error: "El usuario perteneciente a este token ya no existe" });
    }

    // 3. Asignar el usuario fresco de la base de datos a req.user
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" });
  }
};

export const verifyToken = protect;