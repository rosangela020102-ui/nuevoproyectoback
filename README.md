# 🚀 API Ecommerce - Backend React Ready

Este es el backend oficial desarrollado para la plataforma de E-commerce, estructurado de forma limpia y consistente para ser consumido eficientemente por un frontend en React. Cumple con una arquitectura híbrida de base de datos cruzada (Relacional + NoSQL).

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js, Express (ES Modules)
- **Base de Datos Relacional:** Supabase (PostgreSQL) -> Gestión de Usuarios, Productos, Carrito y Pedidos.
- **Base de Datos NoSQL:** MongoDB Atlas -> Gestión de Reseñas (Reviews) y Lista de Favoritos (Wishlist).
- **Documentación Interactiva:** Swagger (`swagger-ui-express`, `swagger-jsdoc`)
- **Seguridad y Autenticación:** JWT (JSON Web Tokens), Cookies seguras, Encriptación y CORS integrado.

## 📁 Estructura del Proyecto

```text
src
│
├─ config          # Conexiones a bases de datos y variables de entorno
├─ controllers     # Controladores de las rutas (manejo de req y res)
├─ middlewares     # Filtros de autenticación, roles y manejo de errores
├─ models          # Modelos y esquemas de datos (Prisma & Mongoose)
├─ routes          # Definición de endpoints y documentación Swagger
├─ services        # Lógica de negocio independiente
└─ utils           # Formateadores y helpers de respuestas

🚀 Endpoints Principales
Autenticación
POST /api/auth/register - Registro de usuario

POST /api/auth/login - Inicio de sesión

GET /api/me - Perfil de usuario autenticado

Productos
GET /api/products - Listar productos

GET /api/products/:id - Obtener un producto por ID

POST /api/products - Crear producto (Admin)

Carrito y Checkout
GET /api/cart - Consultar carrito

POST /api/cart/items - Añadir ítem al carrito

DELETE /api/cart/items/:itemId - Eliminar ítem del carrito

POST /api/cart/checkout - Procesar checkout (Vacía carrito y genera pedido)

Reviews & Wishlist (MongoDB)
GET /api/products/:id/reviews - Listar reviews de un producto

POST /api/products/:id/reviews - Crear review

GET /api/wishlist - Obtener favoritos

POST /api/wishlist/:productId - Guardar en favoritos