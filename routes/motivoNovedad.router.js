const express = require('express');

const router = express.Router();

const MotivoNovedadService = require('../services/motivoNovedades.service');
const motivoNovedadesService = new MotivoNovedadService();

const service = new MotivoNovedadService();


  
router.get('/', async (req, res, next) => {

     // console.log los datos enviados en la solicitud
  console.log(JSON.stringify(req.body));

    try {
      const motivosNovedad = await motivoNovedadesService.findAll();
      console.log('Motivos de novedad recuperados con éxito:', motivosNovedad);
      res.status(200).json(motivosNovedad);
    } catch (error) {
      console.log('Error al recuperar motivos de novedad:', error);
      res.status(500).json({ error: 'Error al recuperar motivos de novedad' });
    }
    // console.log la respuesta del servidor
  console.log(res.status);
  console.log(res.data);
  });


router.get('/', async (req, res, next) => {
  try {
    const motivosNovedades = await motivoNovedadesService.getAll();
    res.status(200).json(motivosNovedades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener motivos de novedad' });
  }
});
  
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const motivoNovedad = await motivoNovedadesService.findOne(id);
      console.log('Motivo de novedad recuperado con éxito:', motivoNovedad);
      res.status(200).json(motivoNovedad);
    } catch (error) {
      console.log('Error al recuperar motivo de novedad:', error);
      res.status(404).json({ error: 'Motivo de novedad no encontrado' });
    }
  });

  router.post('/registrar', async(req, res, next)=>{
    console.log(req.body,"otra cosaaa");

    try {
        const motivoNovedad = req.body
        const newMotivoNovedad = await motivoNovedadesService.create(motivoNovedad)
        res.json(newMotivoNovedad).status(200)
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        }
        else{
            res.status(500).send(error);
        }
    }
})


router.patch('/update/:id', async (req, res, next) => {
  try {
    console.log(req.body,"----------------------------------")
    const updatedData = req.body;
    const idMotivo = req.body.id_motivo;
    console.log(idMotivo);
    const updatedEntity = await motivoNovedadesService.update(idMotivo, updatedData);
    console.log('Motivo de novedad actualizado con éxito:', updatedEntity);
    res.status(200).json(updatedEntity);
  } catch (error) {
    console.log('Error al actualizar motivo de novedad:', error);
    res.status(500).json({ error: 'Error al actualizar motivo de novedad' });
  }
});



  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await motivoNovedadesService.delete(id);
      console.log('Motivo de novedad eliminado con éxito');
      res.status(200).json({ message: 'Motivo Eliminado correctamente' });
    } catch (error) {
      console.log('Error al eliminar motivo de novedad:', error);
      res.status(500).json({ error: 'Error al eliminar motivo de novedad' });
    }
  });

  module.exports = router;