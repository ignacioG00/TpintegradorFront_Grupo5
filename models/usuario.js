module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'admin'
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });

  return Usuario;
};
// Este modelo representa a los usuarios del sistema.
// Incluye campos para nombre, email (único), password y rol (por defecto 'admin').     