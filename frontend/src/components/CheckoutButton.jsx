import React, { useState } from "react";
import clienteAxios from "../api/axios";

const CheckoutButton = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      
      const response = await clienteAxios.post("/payment/create-checkout-session", {
        items: cartItems, 
      });

      
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error al iniciar el pago con Stripe:", error);
      alert("Hubo un error al procesar el pago");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      style={{ 
        padding: "10px 20px", 
        background: "#635BFF", 
        color: "white", 
        border: "none", 
        cursor: "pointer",
        borderRadius: "4px",
        fontWeight: "bold"
      }}
    >
      {loading ? "Conectando con Stripe..." : "Pagar con Stripe"}
    </button>
  );
};

export default CheckoutButton;