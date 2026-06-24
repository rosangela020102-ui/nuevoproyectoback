const wishlistDatabase = {
  items: [] 
};

const getWishlist = async () => {
  return wishlistDatabase;
};

const addToWishlist = async (productId) => {
  const id = parseInt(productId);
  if (!wishlistDatabase.items.includes(id)) {
    wishlistDatabase.items.push(id);
  }
  return wishlistDatabase;
};

const removeFromWishlist = async (productId) => {
  const id = parseInt(productId);
  wishlistDatabase.items = wishlistDatabase.items.filter(item => item !== id);
  return wishlistDatabase;
};

export default { getWishlist, addToWishlist, removeFromWishlist };