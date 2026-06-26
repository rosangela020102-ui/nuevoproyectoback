import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getMe); 
router.get("/me", protect, authController.getMe);

export default router;