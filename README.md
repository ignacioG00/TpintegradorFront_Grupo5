🛍️ Fulbo$hop — TP Integrador 2025
Fulbo$hop es una tienda online ficticia especializada en la venta de camisetas y botines de fútbol. El proyecto está dividido en dos módulos principales:

🔸 Frontend: HTML, CSS y JavaScript

🔸 Backend: Node.js con Express.js y renderizado mediante EJS

Incluye funcionalidades tanto para el cliente como para el administrador, simulando el flujo completo de un ecommerce.

🚀 Tecnologías utilizadas
Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js, EJS

Persistencia: Archivos JSON (simulando una base de datos local)

🧑‍💼 Inicio de sesión
La aplicación ofrece dos formas de acceso:

👤 Cliente: ingresa su nombre para entrar a la tienda.

🛠️ Administrador: accede mediante credenciales válidas al panel de gestión.

🛒 Funcionalidades para Cliente
Visualización de todos los productos disponibles.

Filtrado por tipo de producto (camisetas / botines).

Búsqueda dinámica por texto (nombre, tipo, descripción).

Agregado de productos al carrito de compras.

Finalización de compra con generación de ticket.

Encuesta de satisfacción posterior a la compra.

🔧 Funcionalidades para Administrador
Crear productos nuevos.

Editar productos existentes.

Marcar productos como inactivos (no visibles para el cliente).

Eliminar productos.

Visualizar todos los tickets generados por compras.

Agregar nuevos administradores.

📁 Estructura del repositorio
TP_Integ2025-334_Guillen-Perez/
│
├── dashboard/               → Backend con Express y vistas EJS
│   ├── src/
│   │   ├── controllers/     → Lógica de productos, usuarios y tickets
│   │   ├── views/           → Vistas EJS del panel admin
│   │   └── routes/          → Rutas backend
│
├── frontend/                → Cliente web hecho con HTML, CSS y JS
│
└── README.md                → Documentación del proyecto
⚙️ Instalación y ejecución
🔨 Requisitos
Node.js instalado

Navegador moderno

💻 Pasos para correr localmente
bash
# Cloná el repositorio
git clone https://github.com/ignacioG00/TP_Integ2025-334_Guillen-Perez.git

# Entrá al backend y instalá dependencias
cd dashboard
npm install

# Ejecutá el servidor
npm start
📍 Accedé a http://localhost:3000 para ver la aplicación.

🧪 Datos de prueba
Admin: Usuario: admin Contraseña: clave123

Cliente: Ingresar cualquier nombre para comenzar

📝 Autores
Este proyecto fue realizado por:

Ignacio Guillen

Gonzalo Pérez

Como parte del Trabajo Práctico Integrador de Programación III — UTN · Año 2025
