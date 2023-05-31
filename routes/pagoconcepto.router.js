const express = require('express');

const router = express.Router();

const PagoConceptoService = require('./../services/pagoconcepto.service');
const service = new PagoConceptoService();

router.post('/update-conceptos', async (req, res, next) => {
  try {
    const conceptosActualizar = req.body;
    console.log(conceptosActualizar);
    const conceptosArray = Array.isArray(conceptosActualizar)
      ? conceptosActualizar
      : [conceptosActualizar];
    const result = await Promise.all(
      conceptosArray.map(async (concepto) => {
        return await service.updatePagoConceptoValor(concepto);
      })
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
