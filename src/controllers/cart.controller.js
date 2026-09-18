import cartService from "../services/cart.service.js";
import { formatResponse } from "../utils/response.helper.js";
import prisma from "../config/prisma.js"; // <-- Importamos Prisma

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

    // 1. Comprobar que el cart_item pertenezca al carrito del usuario autenticado usando Prisma
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(itemId),
        cart: {
          userId: userId // Asegura que el carrito pertenece al usuario logueado
        }
      }
    });

    if (!cartItem) {
      return res.status(403).json(
        formatResponse(false, "No tienes permiso para eliminar este producto o el item no existe", null)
      );
    }

    // 2. Si pasa la validación, se borra el item con Prisma
    await prisma.cartItem.delete({
      where: { id: Number(itemId) }
    });
    
    res.status(200).json(formatResponse(true, "Producto eliminado del carrito", null));
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Buscamos el carrito del usuario con Prisma
    const cart = await prisma.cart.findUnique({
      where: { userId: userId }
    });

    if (cart) {
      // Vaciamos los items del carrito
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
    }

    res.status(200).json(formatResponse(true, "Compra realizada y carrito vaciado con éxito", null));
  } catch (error) {
    next(error);
  }
};

export default { getCart, addItem, removeItem, checkout };