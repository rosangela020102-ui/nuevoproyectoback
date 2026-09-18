import prisma from "../config/prisma.js";

// 1. Obtener todos los productos desde Supabase (SQL)
export const getAllProducts = async () => {
    return await prisma.product.findMany();
};

// 2. Crear un producto nuevo en Supabase
export const createProduct = async (productData) => {
    return await prisma.product.create({
        data: productData
    });
};

// 3. Actualizar un producto existente en Supabase
export const updateProduct = async (id, productData) => {
    return await prisma.product.update({
        where: { id: Number(id) },
        data: productData
    });
};

// 4. Eliminar un producto en Supabase
export const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: { id: Number(id) }
    });
};