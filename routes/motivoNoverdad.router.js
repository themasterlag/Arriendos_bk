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
  
  router.post('/registrar', async (req, res, next) => {
    try {
      const motivoNovedad = req.body;
      if ('nombre' in motivoNovedad && typeof motivoNovedad.nombre === 'string' && motivoNovedad.nombre.trim() !== '') {
        const newMotivo = await motivoNovedadesService.create(motivoNovedad);
        console.log('Motivo de novedad creado con éxito:', newMotivo);
        res.status(201).json(newMotivo);
      } else {
        console.log('Error al crear motivo de novedad: El nombre es requerido y debe ser una cadena no vacía');
        res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena no vacía' });
      }
    } catch (error) {
      console.log('Error al crear motivo de novedad:', error);
      res.status(500).json({ error: 'Error al crear motivo de novedad' });
    }
  });



// router.post('/registrar', async (req, res, next) => {
//     try {
//       const motivoNovedad = req.body;
//       if ('nombre' in motivoNovedad && typeof motivoNovedad.nombre === 'string' && motivoNovedad.nombre.trim() !== '') {
//         const newMotivo = await motivoNovedadesService.create(motivoNovedad);
//         res.status(201).json(newMotivo);
//       } else {
//         res.status(400).json({ error: 'El campo "nombre" es obligatorio y debe ser una cadena no vacía' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error al crear motivo de novedad' });
//     }
//   });

// router.post('/registrar', async (req, res) => {
//     const { nombre, descripcion } = req.body;
  
//     // Crear un nuevo motivo de novedad
//     const nuevoMotivo = await motivoNovedadesService.create({
//       nombre,
//       descripcion,
//     });
  
//     // Devolver el motivo de novedad
//     res.status(201).json(nuevoMotivo);
  
//     // Imprimir el contenido de la variable nuevoMotivo en el console log
//     console.log(nuevoMotivo);
//   });
  
  
//   router.patch('/update/:id', async (req, res, next) => {
//     try {
//       const updatedData = req.body;
//       const idMotivo = req.params.id;
//       const updatedEntity = await motivoNovedadesService.update(idMotivo, updatedData);
//       console.log('Motivo de novedad actualizado con éxito:', updatedEntity);
//       res.status(200).json(updatedEntity);
//     } catch (error) {
//       console.log('Error al actualizar motivo de novedad:', error);
//       res.status(500).json({ error: 'Error al actualizar motivo de novedad' });
//     }
//   });

router.patch('/update/:id', async (req, res, next) => {
    try {
      const updatedData = req.body;
      const idMotivo = req.params.id;
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