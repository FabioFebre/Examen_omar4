// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Cargar las variables de entorno
require('dotenv').config();

// Crear la instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres', // ✅ CAMBIADO A POSTGRES
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);


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
