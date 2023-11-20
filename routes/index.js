const express = require('express');
const verifyToken  = require('./../middlewares/veriLogJwt');

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
const saldoCreditoPagoRouter = require('./saldoCreditoPago.router');
const incrementoRouter = require('./incremento.router');
const pagoConceptoRouter = require('./pagoconcepto.router');
const reportesRouter = require('./reportes.router');
const IncrementoContratoRouter = require('./incrementoContrato.router');
const procesosRouter = require('./procesos.router');
const permisoRouter = require('./permiso.router');
const permisoDetalleRouter = require('./permisoDetalle.router');
const cargoRouter = require('./cargo.router');
const tipoConceptoRouter = require('./tipoConcepto.router');
const emailRouter = require('./email.router');
const carnetRouter = require("./carnet.router");
const personalVinculadoRouter = require("./personalVinculado.router");
const novedadesRouter = require("./novedades.router")
const motivoNovedad = require('./motivoNovedad.router');
const tipoPagoNovedadesRouter = require('./tipoPagoNovedades.router');

function routerApi(app) {
  const router = express.Router();

  // RUTAS PUBLICAS
  app.use('/api/arriendos', router);
    router.use('/aut', autRouter);

  app.use('/api/carnetVirtual', router);
    router.use('/carnet', carnetRouter);

    // RUTAS PROTEGIDAS
    router.use(verifyToken);
    router.use('/personaVinculado', personalVinculadoRouter);
  
  app.use('/api/arriendos', router);
    router.use(verifyToken);
    router.use('/cargos', cargoRouter);
    router.use('/usuarios', usuarioRouter);
    router.use('/departamentos', departamentoRouter);
    router.use('/municipios', municipioRouter);
    router.use('/solicitudes', solicitudRouter);
  // router.use('/procesos', procesoRouter); 
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
    router.use('/saldo-credito-pago', saldoCreditoPagoRouter);
    router.use('/pago-conceptos', pagoConceptoRouter);
    router.use('/reportes', reportesRouter);
    router.use('/incremento-contrato', IncrementoContratoRouter);
    router.use('/procesos', procesosRouter);
    router.use('/permisos', permisoRouter);
    router.use('/permiso-detalle', permisoDetalleRouter);
    router.use('/tipo-concepto', tipoConceptoRouter);


  app.use('/api/novedades', router);
    router.use('/novedad', novedadesRouter);
    router.use('/motivoNovedad', motivoNovedad);
    router.use('/tipoPago', tipoPagoNovedadesRouter);
    router.use('/email', emailRouter);

}
module.exports = routerApi;
