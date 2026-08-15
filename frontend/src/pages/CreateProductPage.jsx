import React, { useState } from "react";
import clienteAxios from "../api/axios"; 

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      
      const response = await clienteAxios.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Producto creado:", response.data);
      alert("¡Producto creado con éxito!");
    } catch (error) {
      console.error("Error al crear producto:", error.response?.data || error.message);
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label>Precio:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default CreateProductPage;