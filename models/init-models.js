var DataTypes = require("sequelize").DataTypes;
var _autorizado = require("./autorizado");
var _autorizado_administracion = require("./autorizado_administracion");
var _cliente = require("./cliente");
var _contrato = require("./contrato");
var _contrato_tipo_servicio = require("./contrato_tipo_servicio");
var _departamento = require("./departamento");
var _dispersion = require("./dispersion");
var _entidad_bancaria = require("./entidad_bancaria");
var _factura_servicio = require("./factura_servicio");
var _impuestos_bomberil = require("./impuestos_bomberil");
var _impuestos_reteica = require("./impuestos_reteica");
var _liquidacion = require("./liquidacion");
var _metodo_pago = require("./metodo_pago");
var _microzona = require("./microzona");
var _municipio = require("./municipio");
var _pago = require("./pago");
var _pago_administracion = require("./pago_administracion");
var _pago_arriendo = require("./pago_arriendo");
var _pago_servicios = require("./pago_servicios");
var _periodo = require("./periodo");
var _proceso = require("./proceso");
var _propietario = require("./propietario");
var _propietario_punto_venta = require("./propietario_punto_venta");
var _punto_de_venta = require("./punto_de_venta");
var _responsabilidad = require("./responsabilidad");
var _responsable = require("./responsable");
var _rol = require("./rol");
var _solicitud = require("./solicitud");
var _tipo_contrato = require("./tipo_contrato");
var _tipo_cuenta = require("./tipo_cuenta");
var _tipo_persona = require("./tipo_persona");
var _tipo_servicio = require("./tipo_servicio");
var _usuario = require("./usuario");
var _zona = require("./zona");

function initModels(sequelize) {
  var autorizado = _autorizado(sequelize, DataTypes);
  var autorizado_administracion = _autorizado_administracion(sequelize, DataTypes);
  var cliente = _cliente(sequelize, DataTypes);
  var contrato = _contrato(sequelize, DataTypes);
  var contrato_tipo_servicio = _contrato_tipo_servicio(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var dispersion = _dispersion(sequelize, DataTypes);
  var entidad_bancaria = _entidad_bancaria(sequelize, DataTypes);
  var factura_servicio = _factura_servicio(sequelize, DataTypes);
  var impuestos_bomberil = _impuestos_bomberil(sequelize, DataTypes);
  var impuestos_reteica = _impuestos_reteica(sequelize, DataTypes);
  var liquidacion = _liquidacion(sequelize, DataTypes);
  var metodo_pago = _metodo_pago(sequelize, DataTypes);
  var microzona = _microzona(sequelize, DataTypes);
  var municipio = _municipio(sequelize, DataTypes);
  var pago = _pago(sequelize, DataTypes);
  var pago_administracion = _pago_administracion(sequelize, DataTypes);
  var pago_arriendo = _pago_arriendo(sequelize, DataTypes);
  var pago_servicios = _pago_servicios(sequelize, DataTypes);
  var periodo = _periodo(sequelize, DataTypes);
  var proceso = _proceso(sequelize, DataTypes);
  var propietario = _propietario(sequelize, DataTypes);
  var propietario_punto_venta = _propietario_punto_venta(sequelize, DataTypes);
  var punto_de_venta = _punto_de_venta(sequelize, DataTypes);
  var responsabilidad = _responsabilidad(sequelize, DataTypes);
  var responsable = _responsable(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var solicitud = _solicitud(sequelize, DataTypes);
  var tipo_contrato = _tipo_contrato(sequelize, DataTypes);
  var tipo_cuenta = _tipo_cuenta(sequelize, DataTypes);
  var tipo_persona = _tipo_persona(sequelize, DataTypes);
  var tipo_servicio = _tipo_servicio(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var zona = _zona(sequelize, DataTypes);

  contrato.belongsTo(autorizado, { as: "id_autorizado_autorizado", foreignKey: "id_autorizado"});
  autorizado.hasMany(contrato, { as: "contratos", foreignKey: "id_autorizado"});
  contrato.belongsTo(autorizado_administracion, { as: "id_autorizado_adm_autorizado_administracion", foreignKey: "id_autorizado_adm"});
  autorizado_administracion.hasMany(contrato, { as: "contratos", foreignKey: "id_autorizado_adm"});
  autorizado.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(autorizado, { as: "autorizados", foreignKey: "id_cliente"});
  autorizado_administracion.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(autorizado_administracion, { as: "autorizado_administracions", foreignKey: "id_cliente"});
  propietario_punto_venta.belongsTo(cliente, { as: "id_propietario_cliente", foreignKey: "id_propietario"});
  cliente.hasMany(propietario_punto_venta, { as: "propietario_punto_venta", foreignKey: "id_propietario"});
  responsable.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(responsable, { as: "responsables", foreignKey: "id_cliente"});
  contrato_tipo_servicio.belongsTo(contrato, { as: "id_contrato_contrato", foreignKey: "id_contrato"});
  contrato.hasMany(contrato_tipo_servicio, { as: "contrato_tipo_servicios", foreignKey: "id_contrato"});
  pago_administracion.belongsTo(contrato, { as: "id_contrato_contrato", foreignKey: "id_contrato"});
  contrato.hasMany(pago_administracion, { as: "pago_administracions", foreignKey: "id_contrato"});
  pago_arriendo.belongsTo(contrato, { as: "id_contrato_contrato", foreignKey: "id_contrato"});
  contrato.hasMany(pago_arriendo, { as: "pago_arriendos", foreignKey: "id_contrato"});
  municipio.belongsTo(departamento, { as: "id_departamento_departamento", foreignKey: "id_departamento"});
  departamento.hasMany(municipio, { as: "municipios", foreignKey: "id_departamento"});
  autorizado.belongsTo(entidad_bancaria, { as: "entidad_bancaria_entidad_bancarium", foreignKey: "entidad_bancaria"});
  entidad_bancaria.hasMany(autorizado, { as: "autorizados", foreignKey: "entidad_bancaria"});
  autorizado_administracion.belongsTo(entidad_bancaria, { as: "entidad_bancaria_entidad_bancarium", foreignKey: "entidad_bancaria"});
  entidad_bancaria.hasMany(autorizado_administracion, { as: "autorizado_administracions", foreignKey: "entidad_bancaria"});
  autorizado.belongsTo(metodo_pago, { as: "metodo_pago_metodo_pago", foreignKey: "metodo_pago"});
  metodo_pago.hasMany(autorizado, { as: "autorizados", foreignKey: "metodo_pago"});
  autorizado_administracion.belongsTo(metodo_pago, { as: "metodo_pago_metodo_pago", foreignKey: "metodo_pago"});
  metodo_pago.hasMany(autorizado_administracion, { as: "autorizado_administracions", foreignKey: "metodo_pago"});
  punto_de_venta.belongsTo(microzona, { as: "microzona_microzona", foreignKey: "microzona"});
  microzona.hasMany(punto_de_venta, { as: "punto_de_venta", foreignKey: "microzona"});
  cliente.belongsTo(municipio, { as: "id_municipio_municipio", foreignKey: "id_municipio"});
  municipio.hasMany(cliente, { as: "clientes", foreignKey: "id_municipio"});
  impuestos_bomberil.belongsTo(municipio, { as: "id_municipio_municipio", foreignKey: "id_municipio"});
  municipio.hasMany(impuestos_bomberil, { as: "impuestos_bomberils", foreignKey: "id_municipio"});
  impuestos_reteica.belongsTo(municipio, { as: "id_municipio_municipio", foreignKey: "id_municipio"});
  municipio.hasMany(impuestos_reteica, { as: "impuestos_reteicas", foreignKey: "id_municipio"});
  punto_de_venta.belongsTo(municipio, { as: "id_municipio_municipio", foreignKey: "id_municipio"});
  municipio.hasMany(punto_de_venta, { as: "punto_de_venta", foreignKey: "id_municipio"});
  pago_administracion.belongsTo(periodo, { as: "periodo_periodo", foreignKey: "periodo"});
  periodo.hasMany(pago_administracion, { as: "pago_administracions", foreignKey: "periodo"});
  solicitud.belongsTo(proceso, { as: "id_proceso_proceso", foreignKey: "id_proceso"});
  proceso.hasMany(solicitud, { as: "solicituds", foreignKey: "id_proceso"});
  contrato.belongsTo(punto_de_venta, { as: "id_punto_venta_punto_de_ventum", foreignKey: "id_punto_venta"});
  punto_de_venta.hasMany(contrato, { as: "contratos", foreignKey: "id_punto_venta"});
  propietario_punto_venta.belongsTo(punto_de_venta, { as: "id_punto_venta_punto_de_ventum", foreignKey: "id_punto_venta"});
  punto_de_venta.hasMany(propietario_punto_venta, { as: "propietario_punto_venta", foreignKey: "id_punto_venta"});
  contrato.belongsTo(responsable, { as: "id_responsable_responsable", foreignKey: "id_responsable"});
  responsable.hasMany(contrato, { as: "contratos", foreignKey: "id_responsable"});
  usuario.belongsTo(rol, { as: "rolid_rol_rol", foreignKey: "rolid_rol"});
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "rolid_rol"});
  contrato.belongsTo(tipo_contrato, { as: "tipo_contrato_tipo_contrato", foreignKey: "tipo_contrato"});
  tipo_contrato.hasMany(contrato, { as: "contratos", foreignKey: "tipo_contrato"});
  autorizado.belongsTo(tipo_cuenta, { as: "id_tipo_cuenta_tipo_cuentum", foreignKey: "id_tipo_cuenta"});
  tipo_cuenta.hasMany(autorizado, { as: "autorizados", foreignKey: "id_tipo_cuenta"});
  autorizado_administracion.belongsTo(tipo_cuenta, { as: "id_tipo_cuenta_tipo_cuentum", foreignKey: "id_tipo_cuenta"});
  tipo_cuenta.hasMany(autorizado_administracion, { as: "autorizado_administracions", foreignKey: "id_tipo_cuenta"});
  contrato_tipo_servicio.belongsTo(tipo_servicio, { as: "id_tipo_servicio_tipo_servicio", foreignKey: "id_tipo_servicio"});
  tipo_servicio.hasMany(contrato_tipo_servicio, { as: "contrato_tipo_servicios", foreignKey: "id_tipo_servicio"});
  contrato.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(contrato, { as: "contratos", foreignKey: "id_usuario"});
  microzona.belongsTo(zona, { as: "id_zona_zona", foreignKey: "id_zona"});
  zona.hasMany(microzona, { as: "microzonas", foreignKey: "id_zona"});

  return {
    autorizado,
    autorizado_administracion,
    cliente,
    contrato,
    contrato_tipo_servicio,
    departamento,
    dispersion,
    entidad_bancaria,
    factura_servicio,
    impuestos_bomberil,
    impuestos_reteica,
    liquidacion,
    metodo_pago,
    microzona,
    municipio,
    pago,
    pago_administracion,
    pago_arriendo,
    pago_servicios,
    periodo,
    proceso,
    propietario,
    propietario_punto_venta,
    punto_de_venta,
    responsabilidad,
    responsable,
    rol,
    solicitud,
    tipo_contrato,
    tipo_cuenta,
    tipo_persona,
    tipo_servicio,
    usuario,
    zona,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
