const reviewsDatabase = [
  { reviewId: 1, productId: 101, user: "Rossy", rating: 5, comment: "¡Excelente producto, muy recomendado!" }
];

const getReviewsByProduct = async (productId) => {
  return reviewsDatabase.filter(r => r.productId === parseInt(productId));
};

const createReview = async (reviewData) => {
  const { productId, user, rating, comment } = reviewData;

  if (!productId || !rating || !comment) {
    throw new Error("Faltan campos obligatorios para crear la reseña");
  }

  const newReview = {
    reviewId: reviewsDatabase.length + 1,
    productId: parseInt(productId),
    user: user || "Usuario Anónimo",
    rating: parseInt(rating),
    comment,
    createdAt: new Date()
  };

  reviewsDatabase.push(newReview);
  return newReview;
};

export default { getReviewsByProduct, createReview };