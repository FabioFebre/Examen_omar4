const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(express.static('public'));
const { sequelize } = require('./models');
const zonasRouter = require('./routes/zona');  

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/zonas', zonasRouter);
// Rutas de clientes y zonas
const clientesRoutes = require('./routes/clientes.js');
app.use('/clientes', clientesRoutes);
app.use(zonasRouter);  

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});

// Sincronizar base de datos
sequelize.sync({ force: false }) // Cambiar a 'true' solo para reiniciar las tablas
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.log('Error al sincronizar base de datos:', err));
