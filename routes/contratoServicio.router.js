const express = require('express');

const router = express.Router();

const ContratoServicioService = require('./../services/contrato_servicio.service');

const service = new ContratoServicioService();


router.get('/', async(req,res,next)=>{
  try {
    const contratoServicio = await service.find();
    res.json(contratoServicio);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const contratosServicios = await service.findOne(id);
    console.log(contratosServicios);
    res.json(contratosServicios)
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    console.log(body);
    // para crear un contrato necesito:
    // id pdv, id_usuario(puede ser null),
    const newContratoServicio = await service.create(body)

    res.status(201).json({
      estado:'1',
      id:newContratoServicio,
      respuesta: 'se agrego correctamente el contrato'})
  } catch (error) {
    next(error)
  }
})
router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const contratoServicio = await service.delete(id);
  res.status(201).json(contratoServicio);
  } catch (error) {
    next(error)
  }
})
module.exports = router;
