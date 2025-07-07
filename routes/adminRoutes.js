const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/frontendController');

router.get('/', ctrl.bienvenida);
router.get('/productos', ctrl.productos);
router.get('/detalle/:id', ctrl.detalle);
router.post('/carrito/agregar/:id', ctrl.agregarAlCarrito);
router.get('/carrito', ctrl.carrito);
router.get('/ticket', ctrl.ticket);
router.get('/encuesta', ctrl.encuesta);

router.use((req, res) => {
  res.status(404).render('layouts/404', { mensaje: 'Página no encontrada' });
});

module.exports = router;

// Este archivo define las rutas del administrador y las conecta con el controlador correspondiente.
// Utiliza Express para crear un enrutador que maneja las solicitudes a diferentes endpoints del  administrador, como el login, logout y dashboard.
// Cada ruta está asociada a una función del controlador `adminController`, que se encarga of procesar la solicitud y renderizar la vista adecuada.
// Al final, el enrutador se exporta para ser utilizado en la aplicación principal de Express.
// Las rutas están organizadas de manera que cada una corresponde a una acción específica del administrador,
// como iniciar sesión, cerrar sesión y acceder al dashboard. Esto permite una gestión centralizada de las rutas del administrador en la aplicación.
// Además, se asegura que solo los usuarios autenticados puedan acceder al dashboard, rediriging a la página de login si no están autenticados.
// También se maneja el procesamiento del login, verificando las credenciales del usuario y estableciendo la sesión correspondiente si son válidas.
// Este enfoque modular facilita la escalabilidad y el mantenimiento del código, permitiendo agregar o modificar rutas de manera sencilla en el futuro.
// Además, se pueden agregar middleware para proteger las rutas del administrador, asegurando que solo los usuarios con los permisos adecuados puedan acceder a ellas.
