import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import clienteAxios from "../api/axios";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); 

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        
        await clienteAxios.get("/admin/dashboard");
        setIsAdmin(true);
      } catch (error) {
       
        setIsAdmin(false);
      }
    };

    checkAdminSession();
  }, []);

  
  if (isAdmin === null) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Verificando sesión...</div>;
  }

  
  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;