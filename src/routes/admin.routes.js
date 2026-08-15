import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();


router.use(verifyToken, isAdmin);


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