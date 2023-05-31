const express = require('express');

const router = express.Router();

const PagoConceptoService = require('./../services/pagoconcepto.service');
const service = new PagoConceptoService();

router.post('/update-conceptos', async (req, res, next) => {
  try {
    const conceptosActualizar = req.body;
    const result = await service.updatePagoConceptoValor(conceptosActualizar);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
