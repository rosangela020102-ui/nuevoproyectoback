import { Router } from "express";
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/product.controller.js";


import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { validateProduct } from "../middlewares/productValidation.js"; 
import { upload } from "../config/cloudinary.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", [verifyToken, isAdmin, upload.single("image"), validateProduct], createProduct); 
router.put("/:id", [verifyToken, isAdmin, upload.single("image")], updateProduct);
router.delete("/:id", [verifyToken, isAdmin], deleteProduct);

export default router;