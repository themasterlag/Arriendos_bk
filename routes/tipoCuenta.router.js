const express = require('express');

const router = express.Router();
const TipoCuentaService = require('../services/tipoCuenta.service');

const service = new TipoCuentaService();


router.get('/', async(req,res,next)=>{
  try {
    const tipoCuenta = await service.find();
    res.status(201).json(tipoCuenta);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params;
    const tipoCuenta = await service.findOne(id);
    res.status(201).json(tipoCuenta);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
