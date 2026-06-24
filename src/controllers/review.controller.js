import reviewService from "../services/review.service.js";
import { formatResponse } from "../utils/response.helper.js";

const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getReviewsByProduct(productId);
    res.status(200).json(formatResponse(true, "Reseñas obtenidas con éxito", reviews));
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(formatResponse(true, "Reseña publicada con éxito", newReview));
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default { getProductReviews, addReview };