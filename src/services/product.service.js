import prisma from "../config/prisma.js";


const validateProduct = (data) => {
  const { name, price, stock } = data;

  if (!name || typeof name !== "string" || name.trim() === "") {
    const error = new Error("El nombre del producto es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
    const error = new Error("El precio es obligatorio y debe ser mayor que 0");
    error.statusCode = 400;
    throw error;
  }

  if (stock === undefined || stock === null || isNaN(Number(stock)) || Number(stock) < 0) {
    const error = new Error("El stock es obligatorio y debe ser mayor o igual que 0");
    error.statusCode = 400;
    throw error;
  }
};


export const getAllProducts = async () => {
  return await prisma.product.findMany();
};


export const getProductById = async (id) => {

  const productId = isNaN(id) ? id : Number(id);
  
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return product;
};


export const createProduct = async (productData) => {
  validateProduct(productData);

  return await prisma.product.create({
    data: {
      name: productData.name.trim(),
      description: productData.description,
      price: Number(productData.price),
      stock: Number(productData.stock),
      category: productData.category
    }
  });
};

export const updateProduct = async (id, productData) => {
 
  await getProductById(id);

  const productId = isNaN(id) ? id : Number(id);

  return await prisma.product.update({
    where: { id: productId },
    data: productData
  });
};


export const deleteProduct = async (id) => {
 
  await getProductById(id);

  const productId = isNaN(id) ? id : Number(id);

  return await prisma.product.delete({
    where: { id: productId }
  });
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};