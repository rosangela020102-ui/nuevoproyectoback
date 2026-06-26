import { Router } from "express";
import reviewController from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:productId/reviews", reviewController.getProductReviews);
router.post("/reviews", protect, reviewController.addReview);

export default router;