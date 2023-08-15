const express = require('express');

const router = express.Router();

const TipoPersonaService = require('./../services/tipoPersona.service');

const service = new TipoPersonaService();


router.get('/', async(req,res,next)=>{
  try {
    const tipoPersonas = await service.find();
    res.json(tipoPersonas);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const tipoPersona = await service.findOne(id);
    console.log(tipoPersona);
    res.json(tipoPersona);
  } catch (error) {
    res.status(error.codigo).send(error)
  }
})
module.exports = router;
