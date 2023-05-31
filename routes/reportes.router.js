const express = require('express');

const router = express.Router();
const ContratoService = require('./../services/contrato.service');
const service = new ContratoService();
router.get('/:filtro', async (req, res, next) => {
  try {
    const filter = req.params;
  } catch (error) {}
});

module.exports = router;
