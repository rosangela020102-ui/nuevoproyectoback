export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[LOG] [${timestamp}] Petición ${req.method} a la ruta: ${req.originalUrl}`);
  
  next();
};

export const fakeAuthValidator = (req, res, next) => {
  
  const isAuthorized = true; 
  if (!isAuthorized) {
    return res.status(401).json({ message: "No autorizado. Falta token de seguridad." });
  }

  next();
};