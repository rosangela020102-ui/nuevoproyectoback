# 🚀 API Ecommerce - Backend React Ready

Este es el backend oficial desarrollado para la plataforma de E-commerce, estructurado de forma limpia y consistente para ser consumido eficientemente por un frontend en React. Cumple con una arquitectura híbrida de base de datos cruzada (Relacional + NoSQL).

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js, Express (ES Modules)
- **Base de Datos Relacional:** Supabase (PostgreSQL) -> Gestión de Usuarios, Productos, Carrito y Pedidos.
- **Base de Datos NoSQL:** MongoDB Atlas -> Gestión de Reseñas (Reviews) y Lista de Favoritos (Wishlist).
- **Pasarela de Pagos:** Stripe (Checkout Sessions reales)
- **Documentación Interactiva:** Swagger (`swagger-ui-express`, `swagger-jsdoc`)
- **Seguridad y Autenticación:** Cookies seguras HttpOnly, Encriptación y CORS integrado.

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

POST /api/auth/logout - Cierre de sesión

GET /api/me - Perfil de usuario autenticado

Productos
GET /api/products - Listar productos

GET /api/products/:id - Obtener un producto por ID

POST /api/products - Crear producto (Admin)

Carrito
GET /api/cart - Consultar carrito

POST /api/cart/items - Añadir ítem al carrito

DELETE /api/cart/items/:itemId - Eliminar ítem del carrito

Pagos (Stripe)
POST /api/payment/create-checkout-session - Crear sesión de pago real en Stripe (Protegido)

Reviews & Wishlist (MongoDB)
GET /api/products/:id/reviews - Listar reviews de un producto

POST /api/products/:id/reviews - Crear review

GET /api/wishlist - Obtener favoritos

POST /api/wishlist/:productId - Guardar en favoritos