-- 🧱 Crear la base de datos
CREATE DATABASE IF NOT EXISTS tp_autoservicio DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE tp_autoservicio;

-- 🛍️ Tabla productos
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  precio FLOAT NOT NULL,
  imagen VARCHAR(255),
  activo BOOLEAN DEFAULT true
);

-- 📝 Tabla encuestas
CREATE TABLE encuestas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  comentario TEXT,
  imagen VARCHAR(255),
  calificacion INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 🔐 Tabla usuarios (admin)
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'admin'
);

-- 🔢 Productos de ejemplo
INSERT INTO productos (nombre, tipo, precio, imagen, activo) VALUES
('Coca-Cola 500ml', 'Bebida', 300, 'coca.png', true),
('Alfajor Jorgito', 'Snack', 150, 'jorgito.png', true),
('Galletitas Oreo', 'Snack', 250, 'oreo.png', true),
('Agua Mineral', 'Bebida', 200, 'agua.png', true);

-- 👤 Usuario admin
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Administrador', 'admin@tp.com', '$2b$10$ZzEjDf.rYo8vB0n9h3cLPe8G3Tz.XvR3BtHgDRo1n0zU7oIqE/zVm', 'admin');
-- La contraseña encriptada es "admin123" con bcrypt