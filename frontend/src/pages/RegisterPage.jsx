import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import clienteAxios from "../api/axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      
      await clienteAxios.post("/auth/register", {
        name,
        email,
        password,
      });

      // Si el registro es exitoso, redirigimos al login
      navigate("/login");
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError(
        err.response?.data?.message || "No se pudo completar el registro. Inténtalo de nuevo."
      );
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "50px auto", color: "white", backgroundColor: "#1e1e1e", borderRadius: "8px", border: "1px solid #444", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Cuenta</h2>

      {error && (
        <div style={{ backgroundColor: "#ef4444", color: "white", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "14px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #666", backgroundColor: "#2a2a2a", color: "white", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Correo electrónico:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #666", backgroundColor: "#2a2a2a", color: "white", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #666", backgroundColor: "#2a2a2a", color: "white", boxSizing: "border-box" }}
          />
        </div>

        <button 
          type="submit" 
          style={{ marginTop: "10px", backgroundColor: "#10b981", color: "white", border: "none", padding: "12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
        >
          Registrarse
        </button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
        ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#3b82f6", textDecoration: "underline" }}>Inicia sesión</Link>
      </div>
    </div>
  );
}