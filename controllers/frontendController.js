const { Producto } = require('../models');

// Controlador para manejar las vistas del frontend
// Este controlador maneja las vistas del frontend, incluyendo la bienvenida, productos, carrito, ticket, encuesta y detalle de producto.
// Utiliza el modelo Producto para obtener los datos necesarios y renderizar las vistas correspondientes.
const frontendController = {
  bienvenida: (req, res) => {
    res.render('bienvenida');
  },

  productos: async (req, res) => {
    try {
      const pagina = parseInt(req.query.pagina) || 1;
      const porPagina = 6;
      const offset = (pagina - 1) * porPagina;

      const productosDB = await Producto.findAll({ where: { activo: true } });

      const categorias = {};
      productosDB.forEach(prod => {
        if (!categorias[prod.tipo]) categorias[prod.tipo] = [];
        categorias[prod.tipo].push(prod);
      });

      const categoriasArray = Object.keys(categorias).map(tipo => ({
        nombre: tipo,
        productos: categorias[tipo].slice(offset, offset + porPagina)
      }));

      const totalPaginas = Math.ceil(productosDB.length / porPagina);
      const nombreUsuario = req.query.nombre || 'Cliente';

      res.render('productos', {
        categorias: categoriasArray,
        paginaActual: pagina,
        totalPaginas,
        nombreUsuario
      });
    } catch (error) {
      console.error('Error en productos:', error);
      res.status(500).send('Error interno');
    }
  },

  detalle: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id);

      if (!producto) {
        return res.status(404).render('layouts/404', { mensaje: 'Producto no encontrado' });
      }

      res.render('detalle', { producto });
    } catch (error) {
      console.error('Error en detalle:', error);
      res.status(500).send('Error interno');
    }
  },

  agregarAlCarrito: async (req, res) => {
    const id = parseInt(req.params.id);
    if (!req.session.carrito) req.session.carrito = [];

    // Si ya está, no lo duplica (acá podrías agregar cantidad si querés)
    if (!req.session.carrito.includes(id)) {
      req.session.carrito.push(id);
    }

    res.redirect('/carrito');
  },

  carrito: async (req, res) => {
  const carritoIds = req.session.carrito || [];

  try {
    const productos = await Producto.findAll({
      where: { id: carritoIds }
    });

    // 👇 ESTO es lo importante
    res.render('carrito', { productos });
  } catch (error) {
    console.error('Error en carrito:', error);
    res.status(500).send('Error interno');
  }
}
,

  ticket: (req, res) => {
    res.render('ticket');
  },

  encuesta: (req, res) => {
    res.render('encuesta');
  }
};

module.exports = frontendController;

// Este controlador maneja las vistas del frontend, incluyendo la bienvenida, productos, carrito, ticket, encuesta y detalle de producto.
// Utiliza el modelo Producto para obtener los datos necesarios y renderizar las vistas correspondientes. 