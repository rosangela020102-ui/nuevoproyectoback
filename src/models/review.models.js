import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  userId: { type: Number, required: true },
  user: { type: String, default: "Usuario Anónimo" },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


export class ReviewModelClass {
  constructor({ productId, userId, user, rating, comment }) {
    if (!productId) throw new Error("El ID del producto es obligatorio.");
    this.productId = Number(productId);

    if (!userId) throw new Error("El ID de usuario es obligatorio.");
    this.userId = Number(userId);

    this.user = String(user || "Usuario Anónimo");

    const parsedRating = Number(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      throw new Error("El rating debe ser un número entre 1 y 5.");
    }
    this.rating = parsedRating;

    if (!comment) throw new Error("El comentario es obligatorio.");
    this.comment = String(comment);
  }
}


export const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);