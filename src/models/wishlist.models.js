import { WishlistModel, WishlistModelClass } from "../models/wishlist.models.js";


const getWishlistByUser = async (userId) => {
  if (!userId) {
    throw new Error("El ID de usuario es obligatorio.");
  }
  return await WishlistModel.findOne({ userId: Number(userId) }).populate('products');
};


const addToWishlist = async (userId, productId) => {
  if (!userId || !productId) {
    throw new Error("Faltan el ID de usuario o el ID del producto.");
  }

  let wishlist = await WishlistModel.findOne({ userId: Number(userId) });

  if (!wishlist) {
    
    const validatedData = new WishlistModelClass({
      userId: Number(userId),
      products: [productId]
    });
    wishlist = new WishlistModel(validatedData);
  } else {
    
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }
  }

  wishlist.updatedAt = Date.now();
  return await wishlist.save();
};

export default {
  getWishlistByUser,
  addToWishlist,
};