export const isAdmin = (req, res, next) => {
  
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado, inicia sesión primero" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de Administrador" });
  }

  next(); 
};