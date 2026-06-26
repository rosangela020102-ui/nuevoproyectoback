import { Router } from "express";
import wishlistController from "../controllers/wishlist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, wishlistController.getUserWishlist);
router.post("/", protect, wishlistController.addProduct);
router.delete("/:productId", protect, wishlistController.removeProduct);

export default router;