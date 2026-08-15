import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Aplica el middleware de autenticación y de rol ADMIN a todas las rutas de este archivo
router.use(verifyToken, isAdmin);

// Ruta de ejemplo para el panel de administración
router.get("/dashboard", (req, res) => {
  try {
    res.status(200).json({
      message: "Acceso autorizado al panel de administración",
      user: req.user,
    });
  } catch (error) {
    console.error("Error en la ruta del dashboard:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;