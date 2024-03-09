const express = require('express');

const router = express.Router();

const ArrendadorPDV = require('./../services/arrendadorpdventa.service');

const service = new ArrendadorPDV();

router.get('/', async(req, res, next)=>{
  try {
    const data  = await service.find();
    res.json(data);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const pdvData = await service.findOne(id);
    console.log(pdvData);
    res.json(pdvData)
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    console.log(body);
    const newArrendadorPDV = await service.create(body)

    res.status(201).json(newArrendadorPDV)
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const arrendadorPDV = await service.delete(id);
  res.status(201).json(arrendadorPDV);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

module.exports = router;
