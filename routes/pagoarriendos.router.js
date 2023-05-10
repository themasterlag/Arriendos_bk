const express = require('express');

const router = express.Router();

const PagoArriendosService = require('./../services/pagoarriendos.service');
const PagoRealizadoArriendo = require('./../services/pagoRealizadoArriendo.service');
const service = new PagoArriendosService();
const listadoService = new PagoRealizadoArriendo();
// Devuelve todo el listado de pagos de arriendos
router.get('/', async (req, res, next) => {
  try {
    const filtro = JSON.parse(req.query.datosResponsable);
    const tipo = JSON.parse(req.query.tipoDatos); // 1 No pagados - 2 Pagados
    const rangoFechas = JSON.parse(req.query.rangoFechas);
    const { anio, mes } = JSON.parse(req.query.rangoFechas);
    const fechaInicio = new Date(`${anio}-${mes}-01`);
    const fechaFin = new Date(
      `${anio}-${mes}-${await service.getLastDayOfMonth(anio, mes)}`
    );

    if (tipo == 1) {
      const listado = await service.findPagados(fechaInicio, fechaFin);
      console.log('listado Pagados: ', listado);
      res.status(200).json(listado);
    } else {
      const listado = await service.findNoPagados(
        fechaInicio,
        fechaFin,
        filtro
      );
      res.status(200).json(listado);
    }
  } catch (error) {
    next(error);
  }
});
router.get('/pagados/:anio/:mes', async (req, res, next) => {
  try {
    const { anio, mes } = req.params;
    // const fechaInicio = new Date(`${anio}-${mes}-01`);
    // const fechaFin = service.getLastDayOfMonth(fechaInicio);
    const listadoDePagos = await service.findPagados(mes, anio);
    res.status(200).json(listadoDePagos);
  } catch (error) {
    next(error);
  }
});
router.get('/todos', async (req, res, next) => {
  try {
    const listado = await service.findPagos();
    res.json(listado);
  } catch (error) {
    next(error);
  }
});
router.post('/todos', async (req, res, next) => {
  const { body: pago } = req;
  try {
    const pagosArray = Array.isArray(pago) ? pago : [pago];
    let response;
    const pagosCreado = await Promise.all(
      pagosArray.map(async (pago) => {
        return await service.registrarPagos(pago);
      })
    );
    const idPagos = pagosCreado.map((p)=> p.id_pago_arriendo);
    response={
      estado : '1',
      id:idPagos,
      respuesta: 'Se agregaron correctamente los pagos'
    }
    if (!Array.isArray(pago)) {
      res.status(201).json(response);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    next(error);
    console.log('Error details:', error.message, error.stack);
  }
});
router.get('/sitioventa/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const listado = await service.findOneArriendoByCodigoSitioVenta(id);
    const listadoConceptos = await service.traerConceptosByCodigoSitioVenta(id);
    res.status(200).json({ listado, listadoConceptos });
  } catch (error) {
    next(error);
  }
});
// Devuelve el listado de pagos de un responsable de iva, un no responsable de iva y un pago en efectivo
router.get('/bancolombia', async (req, res, next) => {
  const { opcion } = req.query;
  console.log(opcion);
  try {
    const listado = await service.findAllArriendosByCodigosSitioVenta(opcion);
    res.status(200).json(listado);
  } catch (error) {
    next(error);
  }
});
router.get('/otrosbancos', async (req, res, next) => {
  try {
    const listado = await service.findRegistrosByOtrosBancos();
    res.status(200).json(listado);
  } catch (error) {
    next(error);
  }
});

router.get('/efectivo', async (req, res, next) => {
  try {
    const listado = await service.findRegistrosByEfectivo();
    res.status(200).json(listado);
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
