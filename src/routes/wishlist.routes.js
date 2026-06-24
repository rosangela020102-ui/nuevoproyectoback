import { Router } from "express";
import wishlistController from "../controllers/wishlist.controller.js";

const router = Router();

router.get("/", wishlistController.getUserWishlist);
router.post("/", wishlistController.addProduct);
router.delete("/:productId", wishlistController.removeProduct);

export default router;