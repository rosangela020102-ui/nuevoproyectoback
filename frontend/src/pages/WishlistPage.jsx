import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../api/axios";

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      
      
      const [wishlistRes, productsRes] = await Promise.all([
        clienteAxios.get("/wishlist", { headers: { Authorization: `Bearer ${token}` } }),
        clienteAxios.get("/products")
      ]);

      const messageData = wishlistRes.data.message || wishlistRes.data;
      const rawItems = messageData.items || messageData.wishlist || messageData;
      const itemIds = Array.isArray(rawItems) ? rawItems : [];

      
      const allProducts = productsRes.data.products || productsRes.data.data || productsRes.data;

      
      const matchedProducts = (Array.isArray(allProducts) ? allProducts : []).filter(prod => {
        const prodId = prod.id || prod._id;
        return itemIds.some(id => String(id) === String(prodId) || (id._id && String(id._id) === String(prodId)));
      });

      setWishlistProducts(matchedProducts);
    } catch (err) {
      console.error("Error al cargar la wishlist:", err);
      setError("No se pudo cargar tu lista de deseos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await clienteAxios.delete(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistProducts((prev) => prev.filter((p) => (p.id || p._id) !== productId));
    } catch (err) {
      console.error("Error al eliminar de la wishlist:", err);
    }
  };

  if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Cargando lista de deseos...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>{error}</div>;

  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "sans-serif", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Mi Lista de Deseos ❤️</h1>
        <button 
          onClick={() => navigate("/")}
          style={{ backgroundColor: "#3b82f6", color: "white", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
        >
          Volver al Catálogo
        </button>
      </div>

      {wishlistProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>Tu lista de deseos está vacía.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {wishlistProducts.map((product) => {
            const productId = product.id || product._id;

            return (
              <div key={productId} style={{ border: "1px solid #444", borderRadius: "8px", padding: "15px", backgroundColor: "#1e1e1e", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p style={{ fontWeight: "bold", color: "#4ade80" }}>${product.price}</p>
                </div>
                <button 
                  onClick={() => removeFromWishlist(productId)}
                  style={{ 
                    marginTop: "15px", 
                    backgroundColor: "#ef4444", 
                    color: "white", 
                    border: "none", 
                    padding: "10px", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Eliminar de favoritos
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}