import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// Protegemos la ruta para asegurarnos de que solo usuarios logueados puedan pagar
router.post("/create-checkout-session", protect, paymentController.createCheckoutSession);

export default router;