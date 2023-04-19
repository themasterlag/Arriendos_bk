const express = require('express');
const router = express.Router();
const ContratoConceptoValorService = require('./../services/contratoConceptoValor.service');

const service = new ContratoConceptoValorService();

router.get('/', async (req, res, next) => {
  try {
    const listado = await service.find();
    res.json(listado);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const listado = await service.findOne(id);
    res.json(listado);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body: data } = req;
  try {
    const id = await service.save(data);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
