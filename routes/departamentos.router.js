const express = require('express');

const router = express.Router();
const DepartamentoService = require('./../services/departamento.service');

const service = new DepartamentoService();

router.get('/', async (req, res, next) => {
  try {
    const departamentos = await service.find();
    res.status(201).json(departamentos);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});

router.get('/municipio/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const departamento = await service.findByIdMunicipio(id);
    res.status(200).json(departamento);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const departamento = await service.findOne(id);
    //console.log(departamento);
    res.status(200).json(departamento);
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
