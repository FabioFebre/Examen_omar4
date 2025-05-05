// routes/clientes.js
const express = require('express');
const router = express.Router();
const { Cliente, Zona } = require('../models'); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});
const upload = multer({ storage });

router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const zona = await Zona.findByPk(req.body.zona_id);
    if (!zona) {
      return res.status(400).json({ error: 'Zona no válida' });
    }

    if (req.file) {
      req.body.imagen = req.file.path; 
    }

    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
});
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll(); 
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id); 
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    await cliente.update(req.body); 

    res.status(200).json(cliente); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id); // Buscamos el cliente por su ID
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' }); // Si no lo encuentra, respondemos con error
    }
    res.status(200).json(cliente); // Si lo encuentra, respondemos con los datos del cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del cliente' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    await cliente.destroy(); 
    res.status(200).json({ message: 'Cliente eliminado' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});


module.exports = router;
