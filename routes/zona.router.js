const express = require('express');

const router = express.Router();
const ZonaService = require('./../services/zona.service');

const service = new ZonaService();

router.get('/', async(req,res,next)=>{
  try {
    const zonas = await service.find();
    res.status(201).json(zonas);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params;
    const zona = await service.findOne(id);
    res.status(201).json(zona);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
