const express = require('express');
const incremento = require('../models/incremento');
const router = express.Router();

const IncrementoContratoService = require('./../services/incrementoContrato.service');
const service = new IncrementoContratoService();

router.get('/', async (req, res, next) => {
  try {
    const incrementos = await service.findAllIncrementos();
    res.status(200).json(incrementos);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});

router.post('/guardar', async (req, res, next) => {
  try {
    const incrementos = req.body;
    const incrementosArray = Array.isArray(incrementos)
      ? incrementos
      : [incrementos];
    let response;
    const incrmentosCreados = await Promise.all(
      incrementosArray.map(async (incrmento) => {
        return await service.create(incremento);
      })
    );
    response = {
      estado: '1',
      id: incrmentosCreados,
      respuesta: 'Se guardo correctamente los incrementos',
    };
    if (!Array.isArray(pago)) {
      res.status(201).json(response);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});
router.patch('/update-incremento-contrato', async (req, res, next) => {
  try {
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
