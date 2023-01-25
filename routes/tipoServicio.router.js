const express = require('express');

const router = express.Router();

const TipoServicioService = require('./../services/tipoServicio.service');

const service = new TipoServicioService();

router.get('/', async(req,res,next)=>{
  try {
    const servicios = await service.find();
    res.status(201).json(servicios);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params;
    const servicio = await service.findOne(id);
    res.status(201).json(servicio);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
