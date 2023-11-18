const express = require('express');

const router = express.Router();

const ContratoConceptoService = require('../services/contratoConcepto.service')

const service = new ContratoConceptoService()

router.get('/', async(req,res,next)=>{
  try {
    const contrato = await service.find();
    res.json(contrato);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.get('/concepto/', async(req,res,next)=>{
  try {
    const conceptos = await service.find();
    res.json(conceptos);
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
