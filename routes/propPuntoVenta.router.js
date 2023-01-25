const express = require('express');

const router = express.Router();

const PropPuntoVentaService = require('../services/propietarioPuntoVenta.service');

const service = new PropPuntoVentaService();


router.get('/', async(req,res,next)=>{
  try {
    const proPDV = await service.find();
    res.json(proPDV);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const proPDV = await service.findOne(id);
    console.log(proPDV);
    res.json(proPDV)
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    console.log(body);
    const newProPDV = await service.create(body)

    res.status(201).json(newProPDV)
  } catch (error) {
    next(error)
  }
})

router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const proPDV = await service.delete(id);
  res.status(201).json(proPDV);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
