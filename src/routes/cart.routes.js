import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, cartController.getCart);
router.post("/items", protect, cartController.addItem);
router.delete("/items/:itemId", protect, cartController.removeItem);
router.post("/checkout", protect, cartController.checkout);

export default router;