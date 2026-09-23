import { Router } from "express";
import { 
  getCart, 
  addItemToCart, 
  removeItemFromCart 
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyToken);

router.get("/", getCart);
router.post("/items", addItemToCart);
router.delete("/items/:itemId", removeItemFromCart);

export default router;