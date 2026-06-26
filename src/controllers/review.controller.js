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
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; 
    const userName = req.user.name; 

    const newReview = await reviewService.createReview({
      productId,
      userId,
      user: userName,
      rating,
      comment
    });

    res.status(201).json(formatResponse(true, "Reseña publicada con éxito", newReview));
  } catch (error) {
    next(error);
  }
};

export default { getProductReviews, addReview };