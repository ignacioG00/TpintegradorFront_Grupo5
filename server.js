require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secreto-autoservicio',
  resave: false,
  saveUninitialized: true
}));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const frontendRoutes = require('./routes/frontendRoutes');
app.use('/', frontendRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('layouts/404', { mensaje: 'Página no encontrada' });
});

// Server ON
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
