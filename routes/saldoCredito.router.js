const express = require('express');
const router = express.Router();

const SaldoCreditoService = require('./../services/saldoCredito.service');
const contrato_conceptos = require('../models/contrato_conceptos');

const service = new SaldoCreditoService();

router.get('/', async (req, res, next) => {
  try {
    const saldoCredito = await service.findWithDetails();
    res.json(saldoCredito);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const saldoCredito = await service.findOne(id);
    console.log(saldoCredito);
    res.json(saldoCredito);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newSaldoCredito = await service.create(body);

    res.status(201).json(newSaldoCredito);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newSaldoCredito = await service.update(body.id_saldo_cretido, body);

    res.status(201).json(newSaldoCredito);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const saldoCredito = await service.delete(id);
    res.status(201).json(saldoCredito);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
