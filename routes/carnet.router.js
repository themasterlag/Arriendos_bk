var express = require('express');
var router = express.Router();
const carnetService = require('../services/carnet.service');

router.get('/:id', async function(req, res) {
  try {
    carnet = new carnetService("prueba");
    pdf = await carnet.generarPdf();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'filename=CarnetVirtual.pdf');
    res.send(pdf);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error carnet' });
  }
});

router.post('/', async function(req, res) {
    try {
        const usuarios = await userController.getAllUsers();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener usuarios' });
    }
});


module.exports = router;
