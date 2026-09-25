import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios";
import ProductForm from "../components/ProductForm"; 

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleCreateProduct = async (formData) => {
    try {
      setError(null);

      
      await clienteAxios.post("/products", formData);

  
      alert("¡Producto creado con éxito!");

    
      navigate("/admin");
    } catch (err) {
      console.error("Error al crear producto:", err);
      const message = err.response?.data?.message || "Hubo un error al crear el producto. Inténtalo de nuevo.";
      setError(message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {error && (
        <div style={{ color: "red", marginBottom: "15px", padding: "10px", border: "1px solid red", borderRadius: "4px" }}>
          {error}
        </div>
      )}

      
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default CreateProductPage;