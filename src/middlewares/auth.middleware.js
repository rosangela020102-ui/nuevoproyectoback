import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "No autorizado, falta token" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" });
  }
};

export const verifyToken = protect;