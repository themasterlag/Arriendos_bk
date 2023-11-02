const express = require('express');

const router = express.Router();
const MetodoPagoService = require('./../services/metodoPago.service');

const service = new MetodoPagoService();

router.get('/', async(req,res,next)=>{
  try {
      const municipios = await service.find();
      res.status(201).json(municipios);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const municipio = await service.findOne(id);
    console.log(municipio);
    res.status(200).json(municipio);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
module.exports = router;
