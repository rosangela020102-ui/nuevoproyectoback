import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../api/axios"; 

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await clienteAxios.get("/products");
        
        
        const productsList = response.data.data || response.data || [];
        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await clienteAxios.delete(`/products/${id}`);
      
      setProducts(products.filter((p) => p.id !== id && p._id !== id));
      alert("Producto eliminado con éxito");
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar el producto");
    }
  };

  // Estados de carga y error
  if (loading) return <p>Cargando panel...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administración - Productos</h1>
      
      {/* Botón para crear nuevo producto */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/products/new">
          <button style={{ padding: "8px 15px", background: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}>
            + Crear Nuevo Producto
          </button>
        </Link>
      </div>
      
      {products.length === 0 ? (
        <p>No hay productos creados aún.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => {
            const productId = product.id || product._id;
            return (
              <li key={productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
                <span>
                  <strong>{product.name}</strong> - ${product.price} (Stock: {product.stock ?? "N/D"})
                </span>
                <div>
                  {/* Botón para editar */}
                  <Link to={`/admin/products/${productId}/edit`}>
                    <button style={{ marginRight: "10px", padding: "5px 10px", background: "#ffc107", border: "none", cursor: "pointer", borderRadius: "3px" }}>
                      Editar
                    </button>
                  </Link>
                  {/* Botón para eliminar */}
                  <button 
                    onClick={() => handleDelete(productId)} 
                    style={{ padding: "5px 10px", background: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "3px" }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;