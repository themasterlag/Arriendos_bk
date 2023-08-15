const express = require('express');

const router = express.Router();
const EntidadBancariaService = require('./../services/entidadBancaria');

const service = new EntidadBancariaService();

router.get('/', async(req,res,next)=>{
  try {
      const entidades = await service.find();
      res.status(201).json(entidades);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const entidad = await service.findOne(id);
    console.log(entidad);
    res.status(200).json(entidad);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

module.exports = router;
