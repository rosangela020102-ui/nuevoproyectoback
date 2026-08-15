import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario en PostgreSQL
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 * 
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener Cookie/Token
 *     responses:
 *       200:
 *         description: Login correcto
 * 
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión y limpiar cookie
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout); 

export default router;