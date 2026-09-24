import productService from "../services/product.service.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {

    const productData = {
      ...req.body,
      image: req.file ? req.file.path : undefined
    };

    const product = await productService.createProduct(productData);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    
    const productData = {
      ...req.body,
      ...(req.file && { image: req.file.path })
    };

    const product = await productService.updateProduct(id, productData);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente"
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};