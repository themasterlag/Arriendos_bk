const express = require('express');

const router = express.Router();
const TipoCuentaService = require('../services/tipoCuenta.service');

const service = new TipoCuentaService();


router.get('/', async(req,res,next)=>{
  try {
    const tipoCuenta = await service.find();
    res.status(201).json(tipoCuenta);
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
    const tipoCuenta = await service.findOne(id);
    res.status(201).json(tipoCuenta);
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
