const express = require('express');

const router = express.Router();

const IncrementoService = require('../services/incremento.service');

const service = new IncrementoService();

router.get('/', async (req, res, next) => {
  try {
    const incremento = await service.find();
    res.json(incremento);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const incrementos = await service.findOne(id);
    console.log(incrementos);
    res.json(incrementos);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const incremento = await service.update(id, body);
    console.log('Actualizacion: ', incremento);
    if(!incremento){
      res.status(201).json({
        estado: '1',
        actualizado:incremento,
        respuesta: 'se actualizo correctamente el incremento' 
      })
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
