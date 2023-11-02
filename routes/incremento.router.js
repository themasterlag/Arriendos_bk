const express = require('express');

const router = express.Router();

const IncrementoService = require('../services/incremento.service');

const service = new IncrementoService();

router.get('/', async (req, res, next) => {
  try {
    const incremento = await service.find();
    res.json(incremento);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const incrementos = await service.findOne(id);
    console.log(incrementos);
    res.json(incrementos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.post('/inc', async(req, res, next)=>{
  try {
      const incremento = req.body
      const newIncremento = await service.create(incremento)
      res.json(newIncremento).status(200)
  } catch (error) {
      res.status(error.codigo).send(error)
  }
})

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
    res.status(error.codigo).send(error);
  }
});

router.patch('/update', async(req, res, next)=>{
  try {
      const oldIncremento = req.body
      const idIncremento = oldIncremento.id_incremento
      console.log(idIncremento)
      const updated = await service.update(idIncremento, oldIncremento)
      res.json(updated).status(200)
  } catch (error) {
      res.status(error.codigo).send(error)
  }
})

router.delete('/inc:id', async(req, res, next)=>{
  try {
      const { id } = req.params
      console.log(id)
      const deleted = await service.delete(id)
      res.json(deleted).status(200)
  } catch (error) {
      res.status(error.codigo).send(error)
  }
})

module.exports = router;
