var express = require('express');
var router = express.Router();

const personalService = require('../services/personalVinculado.service');


router.post('/', async function(req, res) {
    try {
      const excel_prueba = req.files;
      const personal = await personalService.leerExcel(excel_prueba);
      res.json(personal);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
    }
});

module.exports = router