const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/frontendController');

// Rutas públicas
router.get('/', ctrl.bienvenida);
router.get('/productos', ctrl.productos);
router.get('/detalle/:id', ctrl.detalle);
router.get('/carrito', ctrl.carrito);
router.post('/carrito/agregar/:id', ctrl.agregarAlCarrito);
router.get('/ticket', ctrl.ticket);
router.get('/encuesta', ctrl.encuesta);

// Ruta 404 personalizada (fallback)
router.use((req, res) => {
  res.status(404).render('layouts/404', { mensaje: 'Página no encontrada' });
});

module.exports = router;

// Este archivo define las rutas del frontend y las conecta con el controlador correspondiente.
// Utiliza Express para crear un enrutador que maneja las solicitudes a diferentes endpoints del frontend, como la bienvenida, productos, carrito, ticket, encuesta y detalle de producto.
// Cada ruta está asociada a una función del controlador `frontendController`, que se encarga de procesar la solicitud y renderizar la vista adecuada.
// Al final, el enrutador se exporta para ser utilizado en la aplicación principal de Express.
// Las rutas están organizadas de manera que cada una corresponde a una vista específica del frontend.