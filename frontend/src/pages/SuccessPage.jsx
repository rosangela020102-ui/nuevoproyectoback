import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div style={{ padding: "50px", textAlign: "center", color: "white", fontFamily: "sans-serif", maxWidth: "600px", margin: "50px auto", backgroundColor: "#1e1e1e", borderRadius: "8px", border: "1px solid #444" }}>
      <h1 style={{ color: "#4ade80", marginBottom: "20px" }}>¡Pago realizado con éxito! 🎉</h1>
      <p style={{ color: "#ccc", marginBottom: "30px", fontSize: "16px" }}>
        Tu orden ha sido procesada correctamente a través de Stripe. ¡Muchas gracias por tu compra!
      </p>
      <button 
        onClick={() => navigate("/")}
        style={{ backgroundColor: "#3b82f6", color: "white", border: "none", padding: "12px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
      >
        Volver al Catálogo
      </button>
    </div>
  );
}