const express = require('express');

const router = express.Router();
const ContratoService = require('./../services/contrato.service');
const service = new ContratoService();
router.get('/:filtro', async (req, res, next) => {
  try {
    const filter = req.params;
    const result = await service.getCodigoSitioVenta(filter);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
