// routes/zona.js
const express = require('express');
const router = express.Router();
const { Zona } = require('../models'); // Importa tu modelo Zona

// Ruta para crear una nueva zona
router.post('/zona', async (req, res) => {
  try {
    // Crea la nueva zona con el nombre recibido del cuerpo de la solicitud
    const nuevaZona = await Zona.create({ nombre: req.body.nombre });

    // Responde con el objeto zona creado
    res.status(201).json(nuevaZona);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear zona' });
  }
});

router.get('/', async (req, res) => {
  try {
    const zonas = await Zona.findAll(); // Obtener todas las zonas de la base de datos
    res.status(200).json(zonas); // Respondemos con las zonas encontradas
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las zonas' });
  }
});

module.exports = router;
