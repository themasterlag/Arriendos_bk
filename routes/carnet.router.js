var express = require('express');
var router = express.Router();
const personalService = require('../services/personalVinculado.service');
const carnetService = require('../services/carnet.service');

router.get('/:documento', async function(req, res) {
  try {
    const documento = req.params.documento;

    let person = await personalService.traerPersonalByIdentificacion(documento);
    let carnet = new carnetService(person);
    let pdf = await carnet.generarPdf();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'filename=CarnetVirtual.pdf');
    res.send(pdf);
  } catch (error) {
    console.log(error);
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).json({ error: 'Error al generar carnet' });
    }
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
