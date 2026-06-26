import { Router } from "express";
import reviewController from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     summary: Obtener las reviews de un producto (MongoDB)
 *     responses:
 *       200:
 *         description: Listado de reviews obtenido
 *   post:
 *     summary: Crear una review para un producto (MongoDB)
 *     responses:
 *       201:
 *         description: Review creada con éxito
 */

router.get("/:id/reviews", reviewController.getProductReviews);
router.post("/:id/reviews", protect, reviewController.addReview);

export default router;