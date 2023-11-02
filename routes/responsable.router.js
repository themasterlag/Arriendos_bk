const express = require('express');
const router = express.Router();

const ResponsableService = require('./../services/responsable.service');

const service = new ResponsableService();

router.get('/', async (req, res, next) => {
  try {
    const responsable = await service.find();
    res.json(responsable);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
router.get('/cliente/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const responsable = await service.findeByCliente(id);
    res.json(responsable);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const responsable = await service.findOne(id);
    console.log(responsable);
    res.json(responsable);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const newResponsable = await service.create(body);

    res.status(201).json(newResponsable);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    const Responsable = await service.delete(id);
    res.status(201).json(Responsable);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

module.exports = router;
