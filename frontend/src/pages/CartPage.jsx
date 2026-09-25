import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios";
import CheckoutButton from "../components/CheckoutButton";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await clienteAxios.get("/cart");
        
      
        const items = response.data?.data?.items || response.data?.items || response.data?.data || response.data || [];
        setCartItems(Array.isArray(items) ? items : []);
        setError(null);
      } catch (err) {
        console.error("Error al cargar el carrito:", err);
        
        
        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError("No se pudo cargar el carrito. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

 
  const handleDeleteItem = async (itemId) => {
    try {
      await clienteAxios.delete(`/cart/items/${itemId}`);
      
      setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== itemId));
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
      
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }

      alert("No se pudo eliminar el producto del carrito.");
    }
  };

  
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.price ?? item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

 
  if (loading) {
    return <p style={{ padding: "30px", textAlign: "center", color: "white" }}>Cargando carrito...</p>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto", color: "white", fontFamily: "sans-serif" }}>
      <h1>Tu Carrito de Compras</h1>

      {/* Estado de error */}
      {error && (
        <div style={{ color: "#ef4444", marginTop: "15px", padding: "10px", border: "1px solid #ef4444", borderRadius: "6px" }}>
          {error}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#888" }}>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
            {cartItems.map((item) => {
              const itemId = item.id || item._id;
              const name = item.name || item.product?.name || "Producto";
              const price = item.price ?? item.product?.price ?? 0;

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
                    <strong style={{ fontSize: "16px" }}>{name}</strong>
                    <p style={{ margin: "5px 0 0 0", color: "#4ade80", fontSize: "14px" }}>
                      ${price} x {item.quantity} =${(price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeleteItem(itemId)}
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
          </div>

          {/* Botón de pago con Stripe */}
          <div style={{ marginTop: "25px" }}>
            <CheckoutButton cartItems={cartItems} />
          </div>
        </>
      )}
    </div>
  );
}