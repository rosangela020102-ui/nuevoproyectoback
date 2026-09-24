import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      
      const response = await clienteAxios.post("/auth/login", {
        email,
        password,
      });

      
      const { token, user } = response.data;

      // Guardamos el token en el localStorage
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.response?.data?.message || "Credenciales incorrectas o error en el servidor."
      );
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "50px auto", color: "white", backgroundColor: "#1e1e1e", borderRadius: "8px", border: "1px solid #444", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Iniciar Sesión</h2>

      {error && (
        <div style={{ backgroundColor: "#ef4444", color: "white", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "14px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
          style={{ marginTop: "10px", backgroundColor: "#3b82f6", color: "white", border: "none", padding: "12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}