import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  userId: { type: Number, required: true },
  user: { type: String, default: "Usuario Anónimo" },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

const getReviewsByProduct = async (productId) => {
  return await Review.find({ productId: parseInt(productId) }).sort({ createdAt: -1 });
};

const createReview = async (reviewData) => {
  const { productId, rating, comment } = reviewData;
  if (!productId || !rating || !comment) {
    throw new Error("Faltan campos obligatorios para crear la reseña");
  }

  const newReview = new Review({
    ...reviewData,
    productId: parseInt(productId),
    rating: parseInt(rating)
  });

  return await newReview.save();
};

export default { getReviewsByProduct, createReview };