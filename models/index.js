// models/index.js

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tp_autoservicio',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const db = {};

// 🔄 Carga automática de todos los modelos
fs.readdirSync(__dirname)
  .filter(file =>
    file !== 'index.js' &&
    file.endsWith('.js')
  )
  .forEach(file => {
    const defineModel = require(path.join(__dirname, file));
    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// 📎 Relaciones entre modelos (si hay)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 🧬 Exportar
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// Este archivo configura la conexión a la base de datos y carga automáticamente todos los modelos.
// Utiliza Sequelize para conectarse a una base de datos MySQL y define un objeto `db` que contiene todos los modelos.
// Además, establece las relaciones entre los modelos si es necesario.