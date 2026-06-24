import wishlistService from "../services/wishlist.service.js";
import { formatResponse } from "../utils/response.helper.js";

const getUserWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.getWishlist();
    res.status(200).json(formatResponse(true, "Lista de deseos obtenida", wishlist));
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const updatedWishlist = await wishlistService.addToWishlist(productId);
    res.status(201).json(formatResponse(true, "Producto añadido a favoritos", updatedWishlist));
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updatedWishlist = await wishlistService.removeFromWishlist(productId);
    res.status(200).json(formatResponse(true, "Producto eliminado de favoritos", updatedWishlist));
  } catch (error) {
    next(error);
  }
};

export default { getUserWishlist, addProduct, removeProduct };