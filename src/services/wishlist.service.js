import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  items: [{ type: Number }]
});

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [] });
  }
  return wishlist;
};

const addToWishlist = async (userId, productId) => {
  const id = parseInt(productId);
  let wishlist = await Wishlist.findOne({ userId });
  
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [] });
  }

  if (!wishlist.items.includes(id)) {
    wishlist.items.push(id);
    await wishlist.save();
  }
  return wishlist;
};

const removeFromWishlist = async (userId, productId) => {
  const id = parseInt(productId);
  let wishlist = await Wishlist.findOne({ userId });
  
  if (wishlist) {
    wishlist.items = wishlist.items.filter(item => item !== id);
    await wishlist.save();
  }
  return wishlist || { userId, items: [] };
};

export default { getWishlist, addToWishlist, removeFromWishlist };