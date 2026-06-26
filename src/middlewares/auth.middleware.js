import { pool } from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.cookie?.split("token=")[1] || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "No autorizado, falta token" });
    }

    const userId = token.split("-for-")[1];

    if (!userId) {
      return res.status(401).json({ success: false, error: "Token inválido" });
    }

    const result = await pool.query("SELECT id, name, email, role FROM users WHERE id = $1", [userId]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: "Usuario no encontrado" });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Error de autenticación" });
  }
};