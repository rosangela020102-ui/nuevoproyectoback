import React, { useEffect, useState } from "react";
import clienteAxios from "../api/axios"; // 👈 Importamos Axios

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al abrir la página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await clienteAxios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await clienteAxios.delete(`/admin/products/${id}`);
      // Quitamos el producto eliminado de la lista visual
      setProducts(products.filter((p) => p.id !== id));
      alert("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  if (loading) return <p>Cargando panel...</p>;

  return (
    <div>
      <h1>Panel de Administración - Productos</h1>
      
      {products.length === 0 ? (
        <p>No hay productos creados aún.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "10px" }}>
              <span>{product.name} - ${product.price}</span>
              <button 
                onClick={() => handleDelete(product.id)} 
                style={{ marginLeft: "10px", background: "red", color: "white" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;