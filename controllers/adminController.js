const { Usuario, Producto } = require('../models');
const bcrypt = require('bcrypt');

const adminController = {
  // Formulario de login
  login: (req, res) => {
    res.render('loginAdmin');
  },

  // Procesamiento del login
  procesarLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        return res.render('loginAdmin', { error: 'Usuario no encontrado' });
      }

      const passwordOk = await bcrypt.compare(password, user.password);

      if (!passwordOk) {
        return res.render('loginAdmin', { error: 'Contraseña incorrecta' });
      }

      req.session.usuario = {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      };

      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('Error en el servidor');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/admin/login'));
  },

  dashboard: async (req, res) => {
    try {
      if (!req.session.usuario) return res.redirect('/admin/login');

      const productos = await Producto.findAll();
      res.render('dashboard', { productos, nombreAdmin: req.session.usuario.nombre });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).send('Error interno');
    }
  }
};

module.exports = adminController;
