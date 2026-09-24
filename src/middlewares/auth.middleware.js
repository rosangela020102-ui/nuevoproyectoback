import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, error: "No autorizado, falta token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ success: false, error: "El usuario perteneciente a este token ya no existe" });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" });
  }
};

export const verifyToken = protect;