const express = require('express');

const router = express.Router();

const ContratoService = require('./../services/contrato.service');

const service = new ContratoService();

router.get('/', async(req,res,next)=>{
  try {
    const contrato = await service.find();
    res.json(contrato);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const contratos = await service.findOne(id);
    console.log(contratos);
    res.json(contratos)
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    console.log(body);
   // const contrato = body.
    // para crear un contrato necesito:
    // id pdv, id_usuario(puede ser null),
   // const newContrato = await service.create(body)

    res.status(201).json({
      estado:'1',
      id:newContrato,
      respuesta: 'se agrego correctamente el contrato'})
  } catch (error) {
    next(error)
  }
})
router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const contrato = await service.delete(id);
  res.status(201).json(contrato);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
