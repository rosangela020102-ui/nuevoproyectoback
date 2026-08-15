import prisma from "../config/prisma.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) || id },
    });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Crear un producto (Con validación y mensajes claros)
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    // --- VALIDACIÓN EN BACKEND ---
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El campo nombre es obligatorio y no puede estar vacío." });
    }

    if (price === undefined || isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ message: "El precio es obligatorio y debe ser un número mayor a 0." });
    }

    if (stock !== undefined && (isNaN(stock) || parseInt(stock) < 0)) {
      return res.status(400).json({ message: "El stock no puede ser un número negativo." });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        stock: stock ? parseInt(stock) : undefined,
      },
    });
    
    res.status(201).json({ 
      message: "Producto creado exitosamente", 
      product: newProduct 
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// Actualizar un producto (Con validación y mensajes claros)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;

    // --- VALIDACIÓN EN BACKEND (si se envían los campos) ---
    if (name !== undefined && name.trim() === "") {
      return res.status(400).json({ message: "El nombre no puede estar vacío." });
    }

    if (price !== undefined && (isNaN(price) || parseFloat(price) <= 0)) {
      return res.status(400).json({ message: "El precio debe ser un número mayor a 0." });
    }

    if (stock !== undefined && (isNaN(stock) || parseInt(stock) < 0)) {
      return res.status(400).json({ message: "El stock no puede ser un número negativo." });
    }

    const updated = await prisma.product.update({
      where: { id: parseInt(id) || id },
      data: { 
        name, 
        price: price ? parseFloat(price) : undefined, 
        description,
        stock: stock !== undefined ? parseInt(stock) : undefined 
      },
    });

    res.json({ 
      message: "Producto actualizado correctamente", 
      product: updated 
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) || id },
    });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};