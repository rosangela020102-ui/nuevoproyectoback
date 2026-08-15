import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios"; // 👈 Importamos Axios configurado con cookies

const EditProductPage = () => {
  const { id } = useParams(); // ID del producto desde la URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Cargar los datos actuales del producto al abrir la página
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await clienteAxios.get(`/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        alert("No se pudo cargar la información del producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 2. Enviar los cambios actualizados al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ya NO necesitamos enviar headers de autorización manuales. 
      // clienteAxios se encarga de enviar la cookie automáticamente (withCredentials: true).
      await clienteAxios.put(`/admin/products/${id}`, {
        name,
        price,
        description,
      });

      alert("¡Producto actualizado con éxito!");
      navigate("/admin"); // Redirige al panel de administración
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response?.data || error.message);
      alert("Hubo un error al actualizar el producto");
    }
  };

  if (loading) return <p>Cargando datos del producto...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Precio:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Descripción:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ padding: "8px 15px", background: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;