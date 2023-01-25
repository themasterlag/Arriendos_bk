const express = require('express');
const router = express.Router();

const ArrendadorService = require('./../services/arrendador.service');

const service = new ArrendadorService();

router.get('/', async(req,res,next)=>{
  try {
    const arrendador = await service.find();
    res.json(arrendador);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const arrendador = await service.findOne(id);
    console.log(arrendador);
    res.json(arrendador)
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    console.log(body);
    const newArrendador = await service.create(body)

    res.status(201).json(newArrendador)
  } catch (error) {
    next(error)
  }
})
router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const arrendador = await service.delete(id);
  res.status(201).json(arrendador);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
