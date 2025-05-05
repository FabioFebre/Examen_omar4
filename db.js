// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Importante para conexión con Render
  }
});

pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL en Render'))
  .catch(err => console.error('❌ Error al conectar:', err));

module.exports = pool;
