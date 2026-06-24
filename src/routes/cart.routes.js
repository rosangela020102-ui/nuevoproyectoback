import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.getCart);
router.post("/items", cartController.addItem);
router.delete("/items/:itemId", cartController.removeItem);
router.post("/checkout", cartController.checkout); 


export default router;