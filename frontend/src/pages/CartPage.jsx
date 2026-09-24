import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import CheckoutButton from "../components/CheckoutButton";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculamos el total usando Redux
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto", color: "white", fontFamily: "sans-serif" }}>
      <h1>Tu Carrito de Compras</h1>
      
      {cart.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#888" }}>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
            {cart.map((item) => {
              const itemId = item.id || item._id;
              return (
                <li 
                  key={itemId} 
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "15px 0", 
                    borderBottom: "1px solid #444" 
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "16px" }}>{item.name}</strong>
                    <p style={{ margin: "5px 0 0 0", color: "#4ade80", fontSize: "14px" }}>
                      ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromCart(itemId))}
                    style={{ 
                      backgroundColor: "#ef4444", 
                      color: "white", 
                      border: "none", 
                      padding: "8px 12px", 
                      borderRadius: "6px", 
                      cursor: "pointer" 
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Total: ${totalAmount.toFixed(2)}</h2>
            <button 
              onClick={() => dispatch(clearCart())}
              style={{ 
                backgroundColor: "transparent", 
                color: "#888", 
                border: "1px solid #666", 
                padding: "8px 12px", 
                borderRadius: "6px", 
                cursor: "pointer" 
              }}
            >
              Vaciar carrito
            </button>
          </div>

          {/* Botón de pago con Stripe */}
          <div style={{ marginTop: "25px" }}>
            <CheckoutButton cartItems={cart} />
          </div>
        </>
      )}
    </div>
  );
}