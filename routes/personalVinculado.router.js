var express = require('express');
var router = express.Router();

const personalService = require('../services/personalVinculado.service');


router.post('/', async function(req, res) {
    try {
      // console.log(req)
      const excel_prueba = req.files;
      console.log(excel_prueba);
      const personal = await personalService.leerExcel(excel_prueba);
      res.json(personal);
    } catch (error) {
      console.log(error);
      if(error.codigo){
        res.status(error.codigo).json({ error: 'Ocurrió un error al crear el personal'});
      }else{
        res.status(500).json({ error: 'Error al realizaR el proceso'})
      }  
    }
});

router.post('/personal', async function(req, res) {
  try {
    const datos = req.body;
    console.log(datos)
    const personal = await personalService.crearPersonal(datos);
    res.json(personal);
  } catch (error) {
    if(error.codigo){
      res.status(error.codigo).json({ error: 'Ocurrió un error al crear el personal'});
    }else{
      res.status(500).json({ error: 'Error al realizaR el proceso'})
    }  
  }
});

router.patch('/personal', async function(req, res) {
  try {
    const datos = req.body;
    const personal = await personalService.actualizarPersonal(datos);
    res.json(personal);
  } catch (error) {
    console.log(error);
    if(error.codigo){
      res.status(error.codigo).json({ error: 'Ocurrió un error al crear el personal'});
    }else{
      res.status(500).json({ error: 'Error al realizaR el proceso'})
    }  
  }
});

router.get('/', async function(req, res) {
  try {
      const personal = await personalService.traerPersonal();
      res.json(personal);
    } catch (error) {
      if(error.codigo){
        res.status(error.codigo).json({ error: 'Ocurrió un error al crear el personal'});
      }else{
        res.status(500).json({ error: 'Error al realizaR el proceso'})
      }  
    }
});

router.get('/crearExcel', async function(req, res) {
  try {
    const personal = await personalService.crearExcel();
    const fechaActual = new Date();
    // Formatea la fecha como 'dd/mm/aaaa'
    const dia = String(fechaActual.getDate()).padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Suma 1 al mes porque los meses van de 0 a 11
    const año = fechaActual.getFullYear();
    // Crea la cadena de fecha en el formato deseado
    const fechaFormateada = `${dia}-${mes}-${año}`;

    res.setHeader('Content-Disposition', `filename=Peronal_Vinculado_${fechaFormateada}.xlsx`);
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(personal);
    // res.json(personal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error al crear el excel del personal'});
  }
});

router.get('/personalIdentificacion/:id', async function(req, res) {
    try {
        console.log(req.params);
        const { id } = req.params;
        const personal = await personalService.traerPersonalByIdentificacion(id);
        res.json(personal);
      } catch (error) {
        if(error.codigo){
          res.status(error.codigo).json({ error: 'Ocurrió un error al crear el personal'});
        }else{
          res.status(500).json({ error: 'Error al realizaR el proceso'})
        }  
      }
});

router.patch('/inhabilitar',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const newCategory = await personalService.inhabilitarPersonal(id);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(error.codigo).json(error);
    }
  });
  router.patch('/habilitar',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const newCategory = await personalService.habilitarPersonal(id);
      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error)
      res.status(error.codigo).json(error);
    }
  });

module.exports = router