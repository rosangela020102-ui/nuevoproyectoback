import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 }
});

export class ProductModelClass {
  constructor({ name, price, category, stock }) {
    if (!name) throw new Error("El nombre del producto es obligatorio.");
    this.name = String(name);
    
    if (!category) throw new Error("La categoría del producto es obligatoria.");
    this.category = String(category);
    
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new Error("El precio debe ser un número válido.");
    }
    this.price = parsedPrice;
    
    this.stock = Number(stock || 0);
  }
}


export const ProductModel = mongoose.model('Product', productSchema, 'thebridge');