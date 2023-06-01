const express = require('express');

const router = express.Router();
const ContratoService = require('./../services/contrato.service');
const service = new ContratoService();
router.get('/:filtro', async (req, res, next) => {
  try {
    const filter = req.params.filtro;
    const result = await service.findCodigoSitioVentaByFilter(filter);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;