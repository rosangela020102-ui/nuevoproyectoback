import { Router } from "express";
import reviewController from "../controllers/review.controller.js";

const router = Router();

router.get("/product/:productId", reviewController.getProductReviews);
router.post("/", reviewController.addReview);

export default router;