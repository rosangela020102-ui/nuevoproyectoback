import cartService from "../services/cart.service.js";
import { formatResponse } from "../utils/response.helper.js";

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id; // Obtenido del middleware protect
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json(formatResponse(true, "Carrito obtenido con éxito", cart));
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    
    const updatedCart = await cartService.addToCart(userId, productId, quantity);
    res.status(201).json(formatResponse(true, "Producto añadido al carrito", updatedCart));
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await pool.query("DELETE FROM cart_items WHERE id = $1", [itemId]);
    
    res.status(200).json(formatResponse(true, "Producto eliminado del carrito", null));
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let cartResult = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
    if (cartResult.rows.length > 0) {
      await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartResult.rows[0].id]);
    }

    res.status(200).json(formatResponse(true, "Compra realizada y carrito vaciado con éxito", null));
  } catch (error) {
    next(error);
  }
};

export default { getCart, addItem, removeItem, checkout };