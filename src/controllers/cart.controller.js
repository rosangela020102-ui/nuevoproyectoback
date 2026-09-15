import cartService from "../services/cart.service.js";
import { formatResponse } from "../utils/response.helper.js";
import { pool } from "../config/db.js";

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id; 
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
    const userId = req.user.id;
    const { itemId } = req.params;

    // 1. Comprobar que el cart_item pertenezca al carrito del usuario autenticado
    const ownershipQuery = `
      SELECT ci.id 
      FROM cart_items ci
      JOIN cart c ON ci.cart_id = c.id
      WHERE ci.id = $1 AND c.user_id = $2
    `;
    const checkResult = await pool.query(ownershipQuery, [itemId, userId]);

    if (checkResult.rows.length === 0) {
      return res.status(403).json(
        formatResponse(false, "No tienes permiso para eliminar este producto o el item no existe", null)
      );
    }

    // 2. Si pasa la validación, se borra el item
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