const express = require('express');

const router = express.Router();
const ContratoService = require('./../services/contrato.service');
const service = new ContratoService();

const PagoArriendosService = require('./../services/pagoarriendos.service')
const pagoArriendoService = new PagoArriendosService()

router.get('/valor-incremento/:id', async (req, res, next) => {
  try {
    const id_contrato = req.params.id;
    const result = await service.darIncrementoCanon(id_contrato);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/contratos-periodo/:mes/:anio/:filtro', async ( req, res, next)=>{
  try {
    const mes = req.params.mes
    const year = req.params.anio
    const filtro = req.params.filtro
    console.log('mes ', mes, '\naño ', year, '\nfiltro', filtro);
    const reportes = await pagoArriendoService.findReportePorFechaYTipoPago(year,mes,filtro)
    res.status(200).json(reportes)

  } catch (error) {
    res.status(error.codigo).send(error)
  }
})

router.get('/:filtro', async (req, res, next) => {
  try {
    const filter = req.params.filtro;
    const result = await service.findCodigoSitioVentaByFilter(filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

module.exports = router;
