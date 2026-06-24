import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";

import { requestLogger, fakeAuthValidator } from "../middlewares/product.middleware.js";

const router = Router();

router.get("/products", requestLogger, fakeAuthValidator, getProducts);

export default router;