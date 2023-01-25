const express = require('express');

const router = express.Router();

const SolicitudService = require('./../services/solicitud.service');

const service = new SolicitudService();

router.get('/', async(req,res,next)=>{
  try {
    const solicitud = await service.find();
    res.json(solicitud);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const solicitud = await service.findOne(id);
    console.log(solicitud);
    res.json(solicitud);
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body;
    const newSolicitud = await service.create(body);
    res.status(201).json(newSolicitud);
  } catch (error) {
    next(error)
  }
})

router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const solicitud = await service.delete(id);
  res.status(201).json(solicitud);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
