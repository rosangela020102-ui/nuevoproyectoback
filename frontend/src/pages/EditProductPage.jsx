import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios";
import ProductForm from "../components/ProductForm"; 

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await clienteAxios.get(`/products/${id}`);
        
        const product = response.data.data || response.data;
        setInitialData(product);
        setError(null);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 
  const handleEditProduct = async (formData) => {
    try {
      setError(null);

      await clienteAxios.put(`/products/${id}`, formData);

      alert("¡Producto actualizado con éxito!");

     
      navigate("/admin");
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      const message = err.response?.data?.message || "Hubo un error al actualizar el producto.";
      setError(message);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Cargando datos del producto...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {error && (
        <div style={{ color: "red", marginBottom: "15px", padding: "10px", border: "1px solid red", borderRadius: "4px" }}>
          {error}
        </div>
      )}

      
      {initialData && (
        <ProductForm initialData={initialData} onSubmit={handleEditProduct} />
      )}
    </div>
  );
};

export default EditProductPage;