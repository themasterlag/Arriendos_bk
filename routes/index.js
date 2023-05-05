const express = require('express');

const usuarioRouter = require('./usuarios.router');
const departamentoRouter = require('./departamentos.router');
const municipioRouter = require('./municipio.router');
const autRouter = require('./aut.router');
const solicitudRouter = require('./solicitud.router');
const procesoRouter = require('./proceso.router');
const arrendadorRouter = require('./arrendador.router');
const tipoPersonaRouter = require('./tipoPersona.router');
const zonaRouter = require('./zona.router');
const microZonaRouter = require('./microZona.router');
const puntoDeVentaRouter = require('./puntoDeVenta.router');
const contratoRouter = require('./contrato.router');
const metodoPagoRouter = require('./metodoPago.router');
const entidadBancariaRouter = require('./entidadBancaria.router');
const tipoContratoRouter = require('./tipoContrato.router');
const registrarPuntoRouter = require('./registrarPunto.router');
const autorizadoRouter = require('./autorizado.router');
const responsableRouter = require('./responsable.router');
const clienteRouter = require('./cliente.router');
const tipoCuentaRouter = require('./tipoCuenta.router');
const subirArchivoRouter = require('./archivos.router');
const tipoServicioRouter = require('./tipoServicio.router');
const pagoarriendosRouter = require('./pagoarriendos.router');
const proPDV = require('./propPuntoVenta.router');
const conceptosRouter = require('./conceptos.router');
const contratoConceptoRouter = require('./contratoConceptos.router');
const saldoCreditoRouter = require('./saldoCredito.router');
const incrementoRouter = require('./incremento.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/arriendos', router);
  router.use('/usuarios', usuarioRouter);
  router.use('/departamentos', departamentoRouter);
  router.use('/municipios', municipioRouter);
  router.use('/solicitudes', solicitudRouter);
  router.use('/procesos', procesoRouter);
  router.use('/arrendadores', arrendadorRouter);
  router.use('/tipopersonas', tipoPersonaRouter);
  router.use('/zona', zonaRouter);
  router.use('/microzona', microZonaRouter);
  router.use('/puntodeventa', puntoDeVentaRouter);
  router.use('/contrato', contratoRouter);
  router.use('/metodopago', metodoPagoRouter);
  router.use('/entidadbancaria', entidadBancariaRouter);
  router.use('/tipocontrato', tipoContratoRouter);
  router.use('/registrarproceso', registrarPuntoRouter);
  router.use('/autorizado', autorizadoRouter);
  router.use('/responsable', responsableRouter);
  router.use('/cliente', clienteRouter);
  router.use('/propietariopunto', proPDV);
  router.use('/tiposervicio', tipoServicioRouter);
  router.use('/tipocuenta', tipoCuentaRouter);
  router.use('/preliquidacion', pagoarriendosRouter);
  router.use('/conceptos', conceptosRouter);
  router.use('/contrato-conceptos', contratoConceptoRouter);
  router.use('/incrementos', incrementoRouter);
  router.use('/archivos', subirArchivoRouter);
  router.use('/saldo-credito', saldoCreditoRouter);

  router.use('/aut', autRouter);
}
module.exports = routerApi;
