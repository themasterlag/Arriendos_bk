const express = require('express');

const router = express.Router();

const ConceptosService = require('../services/conceptos.service');

const service = new ConceptosService();


router.get('/', async(req,res,next)=>{
  try {
      const conceptos = await service.find();
      res.status(201).json(conceptos);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const conceptos = await service.findOne(id);
    //console.log(departamento);
    res.status(200).json(conceptos);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
