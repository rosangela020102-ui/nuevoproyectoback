import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear un producto
export const createProduct = async (req, res) => {
    try {
        const newProduct = await prisma.product.create({
            data: req.body, // { name, description, price, image, stock }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 4. Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 5. Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: "Producto no encontrado" });
    }
};