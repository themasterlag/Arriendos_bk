const express = require('express');
const router = express.Router();

const AutorizadoService = require('./../services/autorizado.service');

const service = new AutorizadoService();

router.get('/', async (req, res, next) => {
  try {
    const autorizado = await service.find();
    res.json(autorizado);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const autorizado = await service.findOne(id);
    console.log(autorizado);
    res.json(autorizado);
  } catch (error) {
    next(error);
  }
});

router.get('/cliente/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const autorizado = await service.findeByCliente(id);
    res.json(autorizado);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const newAutorizado = await service.create(body);

    res.status(201).json(newAutorizado);
  } catch (error) {
    next(error);
  }
});
router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    const Autorizado = await service.delete(id);
    res.status(201).json(Autorizado);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(body);
    const newAutorizado = await service.update(id, body);

    res.status(201).json(newAutorizado);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
