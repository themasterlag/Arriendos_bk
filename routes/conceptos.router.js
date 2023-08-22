const express = require('express');

const router = express.Router();

const ConceptosService = require('../services/conceptos.service');

const service = new ConceptosService();

router.get('/', async (req, res, next) => {
  try {
    const conceptos = await service.find();
    res.status(200).json(conceptos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(error.codigo).send(error);
    }
  });
  
  router.get('/codigo-concepto/:codigo', async (req, res, next) => {
    try {
      const { codigo } = req.params;
      console.log(req.params)
      const puntoDeventa = await service.findByCodigoConcepto(codigo);
      res.status(201).json(puntoDeventa);
    } catch (error) {
      res.status(error.codigo).send(error);
    }
  });

router.get('/asociados', async ( req, res, next) => {
  try {
    const conceptos = await service.findWhitAsociado();
    res.status(200).json(conceptos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const conceptos = await service.findOne(id);
    //console.log(departamento);
    res.status(200).json(conceptos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/tipo/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const conceptos = await service.findTipo(id);
    res.status(200).json(conceptos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});


module.exports = router;
