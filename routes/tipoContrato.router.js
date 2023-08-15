const express = require('express');

const router = express.Router();
const TipoContratoService = require('./../services/tipoContrato.service');

const service = new TipoContratoService();

router.get('/', async(req,res,next)=>{
  try {
      const tiposContratos = await service.find();
      res.status(201).json(tiposContratos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const tipoContrato = await service.findOne(id);
    console.log(tipoContrato);
    res.status(200).json(tipoContrato);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
module.exports = router;
