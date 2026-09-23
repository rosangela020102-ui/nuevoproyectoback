import prisma from "../config/prisma.js";


const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }

  return cart;
};


export const getCart = async (userId) => {
  return await getOrCreateCart(userId);
};


export const addItemToCart = async (userId, { productId, quantity }) => {
  if (!productId || quantity === undefined || quantity <= 0) {
    const error = new Error("El ID del producto y una cantidad válida (> 0) son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  
  const product = await prisma.product.findUnique({
    where: { id: isNaN(productId) ? productId : Number(productId) }
  });

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const cart = await getOrCreateCart(userId);

  const prodId = isNaN(productId) ? productId : Number(productId);
  const qty = Number(quantity);

  
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: prodId
    }
  });

  if (existingItem) {
   
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + qty }
    });
  } else {
    
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: prodId,
        quantity: qty
      }
    });
  }

  return await getCart(userId);
};

export const removeItemFromCart = async (userId, itemId) => {
  const cart = await getOrCreateCart(userId);

  const parsedItemId = isNaN(itemId) ? itemId : Number(itemId);

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: parsedItemId,
      cartId: cart.id
    }
  });

  if (!cartItem) {
    const error = new Error("Ítem no encontrado en tu carrito");
    error.statusCode = 404;
    throw error;
  }

  await prisma.cartItem.delete({
    where: { id: parsedItemId }
  });

  return await getCart(userId);
};

export default {
  getCart,
  addItemToCart,
  removeItemFromCart
};