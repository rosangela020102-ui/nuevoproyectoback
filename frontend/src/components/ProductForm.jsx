import React, { useState, useEffect } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: null, 
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        name: initialData.name || "",
        price: initialData.price || "",
        description: initialData.description || "",
        stock: initialData.stock || "",
        image: null, 
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre del producto es obligatorio.";
    if (form.price === "" || Number(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0.";
    if (form.stock === "" || Number(form.stock) < 0) newErrors.stock = "El stock no puede ser negativo.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] }); 
    } else {
      setForm({ ...form, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
     
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("stock", form.stock);
      if (form.image) {
        formData.append("image", form.image); 
      }

      onSubmit(formData); 
    }
  };

  const isEditing = Boolean(initialData && initialData.id);

  return (
    <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
      <h2>{isEditing ? "Editar Producto" : "Crear Nuevo Producto"}</h2>

      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Precio:</label>
        <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} />
        {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea name="description" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input type="number" name="stock" value={form.stock} onChange={handleChange} />
        {errors.stock && <span style={{ color: "red" }}>{errors.stock}</span>}
      </div>

      <div className="form-group">
        <label>Imagen del Producto:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        {initialData?.image && !form.image && (
          <p style={{ fontSize: "0.8rem" }}>Imagen actual guardada en el sistema.</p>
        )}
      </div>

      <button type="submit">
        {isEditing ? "Actualizar Producto" : "Crear Producto"}
      </button>
    </form>
  );
}