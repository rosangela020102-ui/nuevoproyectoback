import { pool } from "../config/db.js";

const getCartByUserId = async (userId) => {

  let cartResult = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
  
  if (cartResult.rows.length === 0) {
    cartResult = await pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING id", [userId]);
  }
  
  const cartId = cartResult.rows[0].id;

  const itemsResult = await pool.query(
    `SELECT ci.id as item_id, p.id as product_id, p.name, p.price, p.image_url, ci.quantity 
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = $1`,
    [cartId]
  );

  return itemsResult.rows;
};

const addToCart = async (userId, productId, quantity = 1) => {

  let cartResult = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
  if (cartResult.rows.length === 0) {
    cartResult = await pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING id", [userId]);
  }
  const cartId = cartResult.rows[0].id;

  const result = await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity) 
     VALUES ($1, $2, $3)
     ON CONFLICT (cart_id, product_id) 
     DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
     RETURNING *`,
    [cartId, productId, quantity]
  );

  return result.rows[0];
};

export default { getCartByUserId, addToCart };