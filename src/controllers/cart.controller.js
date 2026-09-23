import cartService from "../services/cart.service.js";

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await cartService.getCart(userId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const addItemToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedCart = await cartService.addItemToCart(userId, req.body);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const updatedCart = await cartService.removeItemFromCart(userId, itemId);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    next(error);
  }
};

export default {
  getCart,
  addItemToCart,
  removeItemFromCart
};