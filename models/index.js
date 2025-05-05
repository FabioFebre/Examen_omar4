// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Cargar las variables de entorno
require('dotenv').config();

// Crear la instancia de Sequelize
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'mysql',
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false // Desactiva los logs de SQL si no los necesitas
});

// Importar modelos
const Cliente = require('./cliente')(sequelize, DataTypes);
const Zona = require('./zona')(sequelize, DataTypes);

// Relacionar modelos (si aplica)
Cliente.belongsTo(Zona, { foreignKey: 'zona_id', as: 'zona' });
Zona.hasMany(Cliente, { foreignKey: 'zona_id', as: 'clientes' });


// Exportar la instancia de sequelize y los modelos
module.exports = {
  sequelize,
  Cliente,
  Zona
};
