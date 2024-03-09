const express = require('express');

const router = express.Router();
const MunicipioService = require('./../services/municipio.service');

const service = new MunicipioService();

router.get('/', async(req,res,next)=>{
  try {
      const municipios = await service.find();
      res.status(201).json(municipios);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const municipio = await service.findOne(id);
   // console.log(municipio);
    res.status(200).json(municipio);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});

router.get('/d/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const municipio = await service.findByIdDepartamento(id);
   // console.log(municipio);
    res.status(200).json(municipio);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});
module.exports = router;

