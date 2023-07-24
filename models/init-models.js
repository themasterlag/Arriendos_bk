var DataTypes = require("sequelize").DataTypes;
var _autorizado = require("./autorizado");
var _autorizado_administracion = require("./autorizado_administracion");
var _cliente = require("./cliente");
var _concepto_municipio = require("./concepto_municipio");
var _conceptos = require("./conceptos");
var _contrato = require("./contrato");
var _contrato_conceptos = require("./contrato_conceptos");
var _departamento = require("./departamento");
var _dependencia = require("./dependencia");
var _detalle_calculo_concepto = require("./detalle_calculo_concepto");
var _dispersion = require("./dispersion");
var _entidad_bancaria = require("./entidad_bancaria");
var _factura_servicio = require("./factura_servicio");
var _impuestos_bomberil = require("./impuestos_bomberil");
var _impuestos_reteica = require("./impuestos_reteica");
var _incremento = require("./incremento");
var _incremento_contrato = require("./incremento_contrato");
var _liquidacion = require("./liquidacion");
var _metodo_pago = require("./metodo_pago");
var _microzona = require("./microzona");
var _municipio = require("./municipio");
var _pago = require("./pago");
var _pago_administracion = require("./pago_administracion");
var _pago_arriendo = require("./pago_arriendo");
var _pago_concepto = require("./pago_concepto");
var _pago_detalle = require("./pago_detalle");
var _periodo = require("./periodo");
var _permiso = require("./permiso");
var _proceso = require("./proceso");
var _propietario = require("./propietario");
var _propietario_punto_venta = require("./propietario_punto_venta");
var _punto_de_venta = require("./punto_de_venta");
var _responsabilidad = require("./responsabilidad");
var _responsable = require("./responsable");
var _rol = require("./rol");
var _saldo_credito = require("./saldo_credito");
var _solicitud = require("./solicitud");
var _tipo_concepto = require("./tipo_concepto");
var _tipo_contrato = require("./tipo_contrato");
var _tipo_cuenta = require("./tipo_cuenta");
var _tipo_persona = require("./tipo_persona");
var _tipo_servicio = require("./tipo_servicio");
var _usuario = require("./usuario");
var _usuario_permiso = require("./usuario_permiso");
var _zona = require("./zona");

function initModels(sequelize) {
  var autorizado = _autorizado(sequelize, DataTypes);
  var autorizado_administracion = _autorizado_administracion(sequelize, DataTypes);
  var cliente = _cliente(sequelize, DataTypes);
  var concepto_municipio = _concepto_municipio(sequelize, DataTypes);
  var conceptos = _conceptos(sequelize, DataTypes);
  var contrato = _contrato(sequelize, DataTypes);
  var contrato_conceptos = _contrato_conceptos(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var dependencia = _dependencia(sequelize, DataTypes);
  var detalle_calculo_concepto = _detalle_calculo_concepto(sequelize, DataTypes);
  var dispersion = _dispersion(sequelize, DataTypes);
  var entidad_bancaria = _entidad_bancaria(sequelize, DataTypes);
  var factura_servicio = _factura_servicio(sequelize, DataTypes);
  var impuestos_bomberil = _impuestos_bomberil(sequelize, DataTypes);
  var impuestos_reteica = _impuestos_reteica(sequelize, DataTypes);
  var incremento = _incremento(sequelize, DataTypes);
  var incremento_contrato = _incremento_contrato(sequelize, DataTypes);
  var liquidacion = _liquidacion(sequelize, DataTypes);
  var metodo_pago = _metodo_pago(sequelize, DataTypes);
  var microzona = _microzona(sequelize, DataTypes);
  var municipio = _municipio(sequelize, DataTypes);
  var pago = _pago(sequelize, DataTypes);
  var pago_administracion = _pago_administracion(sequelize, DataTypes);
  var pago_arriendo = _pago_arriendo(sequelize, DataTypes);
  var pago_concepto = _pago_concepto(sequelize, DataTypes);
  var pago_detalle = _pago_detalle(sequelize, DataTypes);
  var periodo = _periodo(sequelize, DataTypes);
  var permiso = _permiso(sequelize, DataTypes);
  var proceso = _proceso(sequelize, DataTypes);
  var propietario = _propietario(sequelize, DataTypes);
  var propietario_punto_venta = _propietario_punto_venta(sequelize, DataTypes);
  var punto_de_venta = _punto_de_venta(sequelize, DataTypes);
  var responsabilidad = _responsabilidad(sequelize, DataTypes);
  var responsable = _responsable(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var saldo_credito = _saldo_credito(sequelize, DataTypes);
  var solicitud = _solicitud(sequelize, DataTypes);
  var tipo_concepto = _tipo_concepto(sequelize, DataTypes);
  var tipo_contrato = _tipo_contrato(sequelize, DataTypes);
  var tipo_cuenta = _tipo_cuenta(sequelize, DataTypes);
  var tipo_persona = _tipo_persona(sequelize, DataTypes);
  var tipo_servicio = _tipo_servicio(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var usuario_permiso = _usuario_permiso(sequelize, DataTypes);
  var zona = _zona(sequelize, DataTypes);
  contrato.belongsTo(autorizado, { as: "autdetalle", foreignKey: "id_autorizado"});
  autorizado.hasMany(contrato, { as: "contratodetalle", foreignKey: "id_autorizado"});
  pago_detalle.belongsTo(autorizado, { as: "autdetalle", foreignKey: "id_autorizado"});
  autorizado.hasMany(pago_detalle, { as: "pddetalle", foreignKey: "id_autorizado"});
  contrato.belongsTo(autorizado_administracion, { as: "autadmdetalle", foreignKey: "id_autorizado_adm"});
  autorizado_administracion.hasMany(contrato, { as: "contratodetalle", foreignKey: "id_autorizado_adm"});
  pago_detalle.belongsTo(autorizado_administracion, { as: "autadmdetalle", foreignKey: "id_autorizado_adm"});
  autorizado_administracion.hasMany(pago_detalle, { as: "pddetalle", foreignKey: "id_autorizado_adm"});
  autorizado.belongsTo(cliente, { as: "clientedetalle", foreignKey: "id_cliente"});
  cliente.hasMany(autorizado, { as: "autorizadosdetalle", foreignKey: "id_cliente"});
  autorizado_administracion.belongsTo(cliente, { as: "clientedetalle", foreignKey: "id_cliente"});
  cliente.hasMany(autorizado_administracion, { as: "autadmdetalle", foreignKey: "id_cliente"});
  propietario_punto_venta.belongsTo(cliente, { as: "propcliente", foreignKey: "id_propietario"});
  cliente.hasMany(propietario_punto_venta, { as: "proppv", foreignKey: "id_propietario"});
  responsable.belongsTo(cliente, { as: "clientedetalle", foreignKey: "id_cliente"});
  cliente.hasMany(responsable, { as: "responsables", foreignKey: "id_cliente"});
  concepto_municipio.belongsTo(conceptos, { as: "conceptodetalle", foreignKey: "id_concepto"});
  conceptos.hasMany(concepto_municipio, { as: "conceptomuni", foreignKey: "id_concepto"});
  contrato_conceptos.belongsTo(conceptos, { as: "conceptodetalle", foreignKey: "id_concepto"});
  conceptos.hasMany(contrato_conceptos, { as: "contconceptos", foreignKey: "id_concepto"});
  detalle_calculo_concepto.belongsTo(conceptos, { as: "conceptodetalle", foreignKey: "id_concepto"});
  conceptos.hasMany(detalle_calculo_concepto, { as: "detcalconcepdetalle", foreignKey: "id_concepto"});
  pago_concepto.belongsTo(conceptos, { as: "conceptodetalle", foreignKey: "id_concepto"});
  conceptos.hasMany(pago_concepto, { as: "pago_conceptos", foreignKey: "id_concepto"});
  contrato_conceptos.belongsTo(contrato, { as: "contratodetalle", foreignKey: "id_contrato"});
  contrato.hasMany(contrato_conceptos, { as: "contconceptos", foreignKey: "id_contrato"});
  detalle_calculo_concepto.belongsTo(contrato, { as: "contratodetalle", foreignKey: "id_contrato"});
  contrato.hasMany(detalle_calculo_concepto, { as: "detcalconcepdetalle", foreignKey: "id_contrato"});
  incremento_contrato.belongsTo(contrato, { as: "contratodetalle", foreignKey: "id_contrato"});
  contrato.hasMany(incremento_contrato, { as: "increontra", foreignKey: "id_contrato"});
  pago_administracion.belongsTo(contrato, { as: "contratodetalle", foreignKey: "id_contrato"});
  contrato.hasMany(pago_administracion, { as: "pagoadmdetalle", foreignKey: "id_contrato"});
  pago_arriendo.belongsTo(contrato, { as: "contratodetalle", foreignKey: "id_contrato"});
  contrato.hasMany(pago_arriendo, { as: "pagoarrdetalle", foreignKey: "id_contrato"});
  municipio.belongsTo(departamento, { as: "departamento", foreignKey: "id_departamento"});
  departamento.hasMany(municipio, { as: "municipios", foreignKey: "id_departamento"});
  usuario.belongsTo(dependencia, { as: "dependenciadetalle", foreignKey: "dependencia"});
  dependencia.hasMany(usuario, { as: "usuariosdetalle", foreignKey: "dependencia"});
  autorizado.belongsTo(entidad_bancaria, { as: "entidadbancaria", foreignKey: "entidad_bancaria"});
  entidad_bancaria.hasMany(autorizado, { as: "autorizadosdetalle", foreignKey: "entidad_bancaria"});
  autorizado_administracion.belongsTo(entidad_bancaria, { as: "entidadbancaria", foreignKey: "entidad_bancaria"});
  entidad_bancaria.hasMany(autorizado_administracion, { as: "autadmdetalle", foreignKey: "entidad_bancaria"});
  contrato.belongsTo(incremento, { as: "incranual1", foreignKey: "incremento_anual"});
  incremento.hasMany(contrato, { as: "contratodetalle", foreignKey: "incremento_anual"});
  autorizado.belongsTo(metodo_pago, { as: "metpagodetalle", foreignKey: "metodo_pago"});
  metodo_pago.hasMany(autorizado, { as: "aut3", foreignKey: "metodo_pago"});
  autorizado_administracion.belongsTo(metodo_pago, { as: "metpagodetalle", foreignKey: "metodo_pago"});
  metodo_pago.hasMany(autorizado_administracion, { as: "autadmdetalle", foreignKey: "metodo_pago"});
  punto_de_venta.belongsTo(microzona, { as: "microzona1", foreignKey: "microzona"});
  microzona.hasMany(punto_de_venta, { as: "pdvdetalle", foreignKey: "microzona"});
  cliente.belongsTo(municipio, { as: "municipiodetalle", foreignKey: "id_municipio"});
  municipio.hasMany(cliente, { as: "clientes", foreignKey: "id_municipio"});
  concepto_municipio.belongsTo(municipio, { as: "municipiodetalle", foreignKey: "id_municipio"});
  municipio.hasMany(concepto_municipio, { as: "concepmuni1", foreignKey: "id_municipio"});
  impuestos_bomberil.belongsTo(municipio, { as: "municipiodetalle", foreignKey: "id_municipio"});
  municipio.hasMany(impuestos_bomberil, { as: "impuestosbomb", foreignKey: "id_municipio"});
  impuestos_reteica.belongsTo(municipio, { as: "municipiodetalle", foreignKey: "id_municipio"});
  municipio.hasMany(impuestos_reteica, { as: "impreteicas", foreignKey: "id_municipio"});
  punto_de_venta.belongsTo(municipio, { as: "municipiodetalle", foreignKey: "id_municipio"});
  municipio.hasMany(punto_de_venta, { as: "pdvdetalle", foreignKey: "id_municipio"});
  pago_concepto.belongsTo(pago_arriendo, { as: "pagoarrdetalle", foreignKey: "id_pago_arriendo"});
  pago_arriendo.hasMany(pago_concepto, { as: "contconceptos", foreignKey: "id_pago_arriendo"});
  pago_detalle.belongsTo(pago_arriendo, { as: "pagoarrdetalle", foreignKey: "id_pago_arriendo"});
  pago_arriendo.hasMany(pago_detalle, { as: "pagodetalle", foreignKey: "id_pago_arriendo"});
  pago_administracion.belongsTo(periodo, { as: "periododetalle", foreignKey: "periodo"});
  periodo.hasMany(pago_administracion, { as: "pagoadmdetalle", foreignKey: "periodo"});
  usuario_permiso.belongsTo(permiso, { as: "permiso1", foreignKey: "id_permiso"});
  permiso.hasMany(usuario_permiso, { as: "usuarioperm", foreignKey: "id_permiso"});
  solicitud.belongsTo(proceso, { as: "proceso1", foreignKey: "id_proceso"});
  proceso.hasMany(solicitud, { as: "solicitud1", foreignKey: "id_proceso"});
  contrato.belongsTo(punto_de_venta, { as: "pvdetalle", foreignKey: "id_punto_venta"});
  punto_de_venta.hasMany(contrato, { as: "contratodetalle", foreignKey: "id_punto_venta"});
  pago_detalle.belongsTo(punto_de_venta, { as: "pvdetalle", foreignKey: "id_punto_venta"});
  punto_de_venta.hasMany(pago_detalle, { as: "pagodetalle", foreignKey: "id_punto_venta"});
  propietario_punto_venta.belongsTo(punto_de_venta, { as: "pvdetalle", foreignKey: "id_punto_venta"});
  punto_de_venta.hasMany(propietario_punto_venta, { as: "proppv", foreignKey: "id_punto_venta"});
  responsable.belongsTo(responsabilidad, { as: "ivares1", foreignKey: "iva"});
  responsabilidad.hasMany(responsable, { as: "responsabledetalle", foreignKey: "iva"});
  responsable.belongsTo(responsabilidad, { as: "reteivarespon", foreignKey: "rete_iva"});
  responsabilidad.hasMany(responsable, { as: "reteivarespon", foreignKey: "rete_iva"});
  responsable.belongsTo(responsabilidad, { as: "retefnterespon", foreignKey: "rete_fuente"});
  responsabilidad.hasMany(responsable, { as: "retefnterespon", foreignKey: "rete_fuente"});
  contrato.belongsTo(responsable, { as: "responsabledetalle", foreignKey: "id_responsable"});
  responsable.hasMany(contrato, { as: "contratodetalle", foreignKey: "id_responsable"});
  pago_detalle.belongsTo(responsable, { as: "responsabledetalle", foreignKey: "id_responsable"});
  responsable.hasMany(pago_detalle, { as: "pagodetalle", foreignKey: "id_responsable"});
  usuario.belongsTo(rol, { as: "rol", foreignKey: "rolid_rol"});
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "rolid_rol"});
  conceptos.belongsTo(tipo_concepto, { as: "tipoconcepto", foreignKey: "tipo_concepto"});
  tipo_concepto.hasMany(conceptos, { as: "conceptos", foreignKey: "tipo_concepto"});
  contrato.belongsTo(tipo_contrato, { as: "tipocontrato", foreignKey: "tipo_contrato"});
  tipo_contrato.hasMany(contrato, { as: "contratodetalle", foreignKey: "tipo_contrato"});
  punto_de_venta.belongsTo(tipo_contrato, { as: "tipopunto", foreignKey: "tipo_punto"});
  tipo_contrato.hasMany(punto_de_venta, { as: "pdvdetalle", foreignKey: "tipo_punto"});
  autorizado.belongsTo(tipo_cuenta, { as: "tipocuenta1", foreignKey: "id_tipo_cuenta"});
  tipo_cuenta.hasMany(autorizado, { as: "autorizadosdetalle", foreignKey: "id_tipo_cuenta"});
  autorizado_administracion.belongsTo(tipo_cuenta, { as: "tipocuenta2", foreignKey: "id_tipo_cuenta"});
  tipo_cuenta.hasMany(autorizado_administracion, { as: "autadmdetalle", foreignKey: "id_tipo_cuenta"});
  contrato.belongsTo(usuario, { as: "usuariocontrato", foreignKey: "id_usuario"});
  usuario.hasMany(contrato, { as: "contratodetalle", foreignKey: "id_usuario"});
  usuario_permiso.belongsTo(usuario, { as: "usuariodetalle", foreignKey: "id_usuario"});
  usuario.hasMany(usuario_permiso, { as: "usuariopermisos", foreignKey: "id_usuario"});
  microzona.belongsTo(zona, { as: "zona", foreignKey: "id_zona"});
  zona.hasMany(microzona, { as: "microzonas", foreignKey: "id_zona"});

  return {
    autorizado,
    autorizado_administracion,
    cliente,
    concepto_municipio,
    conceptos,
    contrato,
    contrato_conceptos,
    departamento,
    dependencia,
    detalle_calculo_concepto,
    dispersion,
    entidad_bancaria,
    factura_servicio,
    impuestos_bomberil,
    impuestos_reteica,
    incremento,
    incremento_contrato,
    liquidacion,
    metodo_pago,
    microzona,
    municipio,
    pago,
    pago_administracion,
    pago_arriendo,
    pago_concepto,
    pago_detalle,
    periodo,
    permiso,
    proceso,
    propietario,
    propietario_punto_venta,
    punto_de_venta,
    responsabilidad,
    responsable,
    rol,
    saldo_credito,
    solicitud,
    tipo_concepto,
    tipo_contrato,
    tipo_cuenta,
    tipo_persona,
    tipo_servicio,
    usuario,
    usuario_permiso,
    zona,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
