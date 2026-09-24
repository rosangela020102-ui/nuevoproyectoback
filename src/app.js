import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js"; 

import authController from "./controllers/auth.controller.js";
import { protect } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); 

// --- AQUÍ VA EL NUEVO CORS ---
const allowedOrigins = [
  "https://proyectobackyfront.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Bloqueado por CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./swagger.json"), "utf8")
);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ success: true, message: "API Funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes); 

app.get("/api/me", protect, authController.getMe); 

app.use(notFound);
app.use(errorHandler);

export default app;