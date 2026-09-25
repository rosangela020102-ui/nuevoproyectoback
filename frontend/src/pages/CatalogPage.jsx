import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1. Cargar productos desde GET /products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await clienteAxios.get("/products");
        const list = response.data.products || response.data.data || response.data;
        setProducts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("No se pudieron cargar los productos del servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Añadir al carrito conectado al backend 
  const handleAddToCart = async (product) => {
    const productId = product.id || product._id;

    try {
      await clienteAxios.post("/cart/items", {
        productId: productId,
        quantity: 1,
      });

      alert("¡Producto añadido al carrito!");
    } catch (err) {
      console.error("Error al añadir al carrito:", err);

      // Si la API responde 401, redirige al login
      if (err.response?.status === 401) {
        alert("Debes iniciar sesión para añadir productos al carrito.");
        navigate("/login");
      } else {
        alert("No se pudo añadir el producto al carrito.");
      }
    }
  };

  // 3. Añadir a Wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para añadir productos a favoritos.");
        navigate("/login");
        return;
      }

      await clienteAxios.post(
        "/wishlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("¡Producto añadido a tu lista de deseos!");
    } catch (err) {
      console.error("Error al añadir a la wishlist:", err);
      alert(err.response?.data?.message || "No se pudo añadir a favoritos.");
    }
  };

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Cargando catálogo...
      </div>
    );
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </div>
    );

  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Catálogo de Productos</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/wishlist")}
            style={{
              backgroundColor: "#ec4899",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Wishlist ❤️
          </button>
          <button
            onClick={() => navigate("/cart")}
            style={{
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Ver Carrito 🛒
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p>No hay productos disponibles en este momento.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => {
            const productId = product.id || product._id;
            return (
              <div
                key={productId}
                style={{
                  border: "1px solid #444",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#1e1e1e",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p style={{ fontWeight: "bold", color: "#4ade80" }}>${product.price}</p>
                  <p style={{ fontSize: "12px", color: "#888" }}>
                    Stock: {product.stock ?? "N/D"}
                  </p>
                </div>

                {/* Contenedor inferior para los botones alineados */}
                <div style={{ display: "flex", gap: "8px", marginTop: "15px", alignItems: "center" }}>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      flex: 1,
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Añadir al carrito
                  </button>
                  <button
                    onClick={() => addToWishlist(productId)}
                    title="Añadir a favoritos"
                    style={{
                      backgroundColor: "#2a2a2a",
                      color: "#ec4899",
                      border: "1px solid #ec4899",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}