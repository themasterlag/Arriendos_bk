const express = require('express');

const router = express.Router();

const PagoArriendosService = require('./../services/pagoarriendos.service');
const PagoRealizadoArriendo = require('./../services/pagoRealizadoArriendo.service');
const service = new PagoArriendosService();
const listadoService = new PagoRealizadoArriendo();
// Devuelve todo el listado de pagos de arriendos
router.get('/', async (req, res, next) => {
  try {
    const listado = await service.findArriendos();
    res.json(listado);
  } catch (error) {
    next(error);
  }
});
// Devuelve el listado de pagos de un responsable de iva, un no responsable de iva y un pago en efectivo
router.get('/:opcion', async (req, res, next) => {
  const { opcion } = req.params;
  try {
    const listado = await service.findArriendosByFilter(opcion);
    res.json(listado);
  } catch (error) {
    next(error);
  }
});
router.get('/:id/:anio', async (req, res, next) => {
  const { id, anio } = req.params;

  try {
    const listadoFiltrado = await service.findRegistros(id, anio);
    res.status(200).json(listadoFiltrado);
  } catch (error) {
    next(error);
  }
});

router.get('/pagados', async (req, res, next) => {
  try {
    const listadoDePagos = await listadoService.getPagos();
    res.status(200).json(listadoDePagos);
  } catch (error) {
    next(error);
  }
});
router.get('/liquidados/:id/:anio', async (req, res, next) => {
  try {
    const { id, anio } = req.params;
    const listadoDePagos = await service.findPagados(id, anio);
    res.status(200).json(listadoDePagos);
  } catch (error) {
    next(error);
  }
});

// Crea la nueva liquidacion
router.post('/liquidacion', async (req, res, next) => {
  try {
    const body = req.body;
    body.estado = 0;
    console.log(body);
    const newArriendoPagado = await service.createLiquidacion(body);
    res.status(201).json({
      estado: '1',
      id: newArriendoPagado,
      respuesta: 'se agrego correctamente la liquidacion',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newPagoArriendo = await listadoService.pagarArriendo(body);
    res.status(201).json({
      estado: '1',
      pago_arriendo_id: newPagoArriendo,
      respuesta: 'se agrego correctamente el pago arriendo',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/liquidacion', async (req, res, next) => {
  try {
    const liquidaciones = await service.findLiquidaciones();
    res.status(200).json(liquidaciones);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
