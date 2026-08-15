import React from "react";
import CheckoutButton from "../components/CheckoutButton"; 

const CartPage = () => {
  const productosEnElCarrito = [
    { id: 1, name: "Producto de ejemplo", price: 50, quantity: 1 }
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Tu Carrito de Compras</h1>
      
      <p>Revisa tus productos antes de realizar el pago:</p>
      
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {productosEnElCarrito.map((item, index) => (
          <li key={index} style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
            <strong>{item.name}</strong> - ${item.price} (Cantidad: {item.quantity})
          </li>
        ))}
      </ul>

      {/* Botón de pago con Stripe */}
      <div style={{ marginTop: "20px" }}>
        <CheckoutButton cartItems={productosEnElCarrito} />
      </div>
    </div>
  );
};

export default CartPage;