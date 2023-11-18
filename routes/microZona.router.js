const express = require('express');

const router = express.Router();
const MicroZonaService = require('./../services/microzona.service');

const service = new MicroZonaService();

router.get('/', async(req,res,next)=>{
  try {
    const microZonas = await service.find();
    res.status(201).json(microZonas);
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
    const {id} = req.params;
    const microZona = await service.findOne(id);
    res.status(201).json(microZona);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.get('/z/:id', async(req, res, next)=>{
  try {
    const {id} = req.params;
    const mZona = await service.findByZonaId(id);
    res.status(201).json(mZona);
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
