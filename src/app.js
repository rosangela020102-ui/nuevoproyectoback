import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce - React Ready",
      version: "1.0.0",
      description: "Documentación oficial de los endpoints (PostgreSQL + MongoDB)",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ],
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({ success: true, message: "API Funcionando - Backend React Ready" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

export default app;