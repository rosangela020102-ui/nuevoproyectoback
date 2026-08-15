import { Router } from "express";
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/product.controller.js";

// Importación de middlewares
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Rutas públicas
router.get("/", getProducts);
router.get("/:id", getProductById);

// Rutas protegidas solo para administradores (CRUD)
router.post("/", [verifyToken, isAdmin], createProduct);
router.put("/:id", [verifyToken, isAdmin], updateProduct);
router.delete("/:id", [verifyToken, isAdmin], deleteProduct);

export default router;