const express = require('express');

const router = express.Router();

const PagoArriendosService = require('./../services/pagoarriendos.service');
const PagoRealizadoArriendo = require('./../services/pagoRealizadoArriendo.service');
const ContratoService = require('./../services/contrato.service');
const service = new PagoArriendosService();
const serviceContrato = new ContratoService();
const listadoService = new PagoRealizadoArriendo();
const ContratoConcepto = require('./../services/contratoConcepto.service');
const contratoConceptoService = new ContratoConcepto();
const PagoConcepto = require('./../services/pagoconcepto.service');
const PagoConceptoService = new PagoConcepto();
const SaldoCredito = require('./../services/saldoCredito.service');
const SaldoCreditoService = new SaldoCredito();
const SaldoCreditoPago = require('./../services/saldoCreditoPago.service');
const pago = require('../models/pago');
const SaldoCreditoPagoService = new SaldoCreditoPago();
// Devuelve todo el listado de pagos de arriendos
router.get('/', async (req, res, next) => {
  try {
    const filtro = JSON.parse(req.query.datosResponsable);
    const tipo = JSON.parse(req.query.tipoDatos); // 1 No pagados - 2 Pagados
    // const rangoFechas = JSON.parse(req.query. );
    const { anio, mes } = JSON.parse(req.query.rangoFechas);
    const fechaInicio = new Date(`${anio}-${mes}-01`);
    const fechaFin = new Date(
      `${anio}-${mes}-${await service.getLastDayOfMonth(anio, mes)}`
    );

    if (tipo == 1) {
      const listado = await service.findPagados(fechaInicio, fechaFin);
      
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
    res.status(error.codigo).send(error);
  }
});

router.get('/prenomina', async (req, res, next) => {
  try {
    const idContratos = JSON.parse(req.query.idContratos);
    // console.log('idContratos: ', idContratos);
    let listaContratos = [];

    for (let i = 0; i < idContratos.length; i++) {
      let contrato =  await serviceContrato.findOne(idContratos[i]);
      contrato = contrato.toJSON();
      let conceptos = await contratoConceptoService.findByContrato(contrato.id_contrato);

      contrato["conceptos"] = conceptos;
      listaContratos.push(contrato);
    }

    res.status(200).json(listaContratos);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/nomina', async (req, res, next) => {
  try {
    const idPagos = JSON.parse(req.query.idPagos);
    let listaPagos = [];
    
    for (let i = 0; i < idPagos.length; i++) {
      let pago =  await service.findOne(idPagos[i]);
      console.log(pago);
      pago = pago[0].toJSON();

      let conceptos = await PagoConceptoService.findByPago(pago.id_pago_arriendo);

      pago["conceptos"] = conceptos;
      listaPagos.push(pago);
    }

    res.status(200).json(listaPagos);
  } catch (error) {
    res.status(error.codigo).send(error);
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
    res.status(error.codigo).send(error);
  }
});
router.get('/todos', async (req, res, next) => {
  try {
    const listado = await service.findPagos();
    res.json(listado);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
router.post('/todos', async (req, res, next) => {
  const { body: pago } = req;
  try {
    const pagosArray = Array.isArray(pago) ? pago : [pago];
    pagosArray.forEach(async (pago) => {
      let conceptos = await contratoConceptoService.findByContrato(pago.id_contrato);
      if (conceptos){
        conceptos.forEach(async concepto => {
          let saldo = await SaldoCreditoService.findOneByIdContratoConcepto(concepto.id_contrato_concepto);
          console.log(saldo);
          if (saldo){
            let creditoPago = await SaldoCreditoPagoService.create({valor_pago: concepto.valor, id_usuario: pago.id_usuario, id_saldo_credito: saldo.id_saldo_credito});
            saldo = await SaldoCreditoService.abonarSaldoCredito(creditoPago.id_saldo_credito, creditoPago.valor_pago);
          }
        });
      }
    });

    let response;
    const pagosCreado = await Promise.all(
      pagosArray.map(async (pago) => {
        let pago_arriendo = await service.registrarPagos(pago);
        pago.conceptos[0].forEach( async concepto =>{
          let pago_concepto = await PagoConceptoService.findByPagoArriendoAndConcepto(pago_arriendo.id_pago_arriendo, concepto.id_concepto)
          pago_concepto.pago_concepto_valor = Math.floor(concepto.valor)
          await  pago_concepto.save({fields:['pago_concepto_valor']})
        })
        return pago_arriendo
      })
    );

    const idPagos = pagosCreado.map((p)=> p.id_pago_arriendo);
    response={
      estado : '1',
      id:pagosCreado,
      respuesta: 'Se agregaron correctamente los pagos'
    }
    if (!Array.isArray(pago)) {
      res.status(201).json(response);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
router.get('/sitioventa/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const listado = await service.findOneArriendoByCodigoSitioVenta(id);
    const listadoConceptos = await service.traerConceptosByCodigoSitioVenta(id);
    res.status(200).json({ listado, listadoConceptos });
  } catch (error) {
    res.status(error.codigo).send(error);
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
    res.status(error.codigo).send(error);
  }
});
router.get('/otrosbancos', async (req, res, next) => {
  try {
    const listado = await service.findRegistrosByOtrosBancos();
    res.status(200).json(listado);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/efectivo', async (req, res, next) => {
  try {
    const listado = await service.findRegistrosByEfectivo();
    res.status(200).json(listado);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id/:anio', async (req, res, next) => {
  const { id, anio } = req.params;

  try {
    const listadoFiltrado = await service.findRegistros(id, anio);
    res.status(200).json(listadoFiltrado);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/pagados', async (req, res, next) => {
  try {
    const listadoDePagos = await listadoService.getPagos();
    res.status(200).json(listadoDePagos);
  } catch (error) {
    res.status(error.codigo).send(error);
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
    res.status(error.codigo).send(error);
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
    res.status(error.codigo).send(error);
  }
});

router.get('/liquidacion', async (req, res, next) => {
  try {
    const liquidaciones = await service.findLiquidaciones();
    res.status(200).json(liquidaciones);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
module.exports = router;
