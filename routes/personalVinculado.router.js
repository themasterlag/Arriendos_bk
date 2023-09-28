var express = require('express');
var router = express.Router();

const personalService = require('../services/personalVinculado.service');


router.post('/', async function(req, res) {
    try {
      const excel_prueba = req.files;
      console.log(req);
      const personal = await personalService.leerExcel(excel_prueba);
      res.json(personal);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
    }
});

router.post('/personal', async function(req, res) {
  try {
    const datos = req.body;
    console.log(datos)
    const personal = await personalService.crearPersonal(datos);
    res.json(personal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
  }
});

router.patch('/personal', async function(req, res) {
  try {
    const datos = req.body;
    const personal = await personalService.actualizarPersonal(datos);
    res.json(personal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
  }
});

router.get('/', async function(req, res) {
  try {
      const personal = await personalService.traerPersonal();
      res.json(personal);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
    }
});

router.get('/crearExcel', async function(req, res) {
  try {
    const personal = await personalService.crearExcel();

    res.setHeader('Content-Disposition', 'filename=archivo.xlsx');
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(personal);
    // res.json(personal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
  }
})

router.get('/personalIdentificacion/:id', async function(req, res) {
    try {
        console.log(req.params);
        const { id } = req.params;
        const personal = await personalService.traerPersonalByIdentificacion(id);
        res.json(personal);
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener el personal'});
      }
});

module.exports = router