import cartService from "../services/cart.service.js";
import { formatResponse } from "../utils/response.helper.js";

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart();
    res.status(200).json(formatResponse(true, "Carrito obtenido con éxito", cart));
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const updatedCart = await cartService.addItemToCart(req.body);
    res.status(201).json(formatResponse(true, "Producto añadido al carrito", updatedCart));
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const updatedCart = await cartService.removeItemFromCart(itemId);
    res.status(200).json(formatResponse(true, "Producto eliminado del carrito", updatedCart));
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const order = await cartService.checkoutCart();
    res.status(200).json(formatResponse(true, "Compra realizada con éxito. Carrito CHECKED_OUT.", order));
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default { getCart, addItem, removeItem, checkout };