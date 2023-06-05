const con = require('../libs/sequelize');
const { Op } = require('sequelize');
class ContratoService {
  constructor() {}

  async create(data) {
    const contrato = await con.models.contrato.create(data);
    return contrato.id_contrato;
  }
  async findAllContratos() {
    const result = await con.models.contrato.findAll({
      include: [
        {
          model: con.models.punto_de_venta,
          as: 'id_punto_venta_punto_de_ventum',
          attributes: ['nombre_comercial', 'codigo_sitio_venta'],
        },
      ],
    });
    return result;
  }
  async find() {
    const [data] = await con.query(
      `select * from arriendos.contrato
        inner join arriendos.punto_de_venta
          ON punto_de_venta.id_punto_venta = contrato.id_punto_venta
      order by punto_de_venta.codigo_sitio_venta asc`
    );
    return data;
  }

  async findOne(id) {
    const rta = await con.models.contrato.findOne({
      where: {
        id_contrato: id,
      },
      include: [
        {
          association: 'id_autorizado_autorizado',
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_responsable_responsable',
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_autorizado_adm_autorizado_administracion',
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_punto_venta_punto_de_ventum',
        },
      ],
    });
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }

  async findOnePdv(id) {
    const rta = await con.models.contrato.findOne({
      include: [
        {
          association: 'id_responsable_responsable',
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_autorizado_autorizado',
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_punto_venta_punto_de_ventum',
          where: { codigo_sitio_venta: id },
        },
      ],
    });
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {
    const contrato = await this.findOne(id);

    const rta = await contrato.update(changes);

    return rta;
  }

  async delete(id) {
    const contrato = await this.findOne(id);
    await contrato.destroy();
    return 'eliminado';
  }
  async inhabilitarContrato(id, fecha_inactivo, razon_inactivo) {
    console.log('Service ID: ', id);
    const contrato = await this.findOne(id);
    await contrato.update({
      fecha_inactivo: fecha_inactivo,
      razon_inactivo: razon_inactivo,
    });
    return contrato.id_contrato;
  }

  async traerContratosConConceptos(sitioVenta) {
    const result = await con.models.contrato.findAll({
      attributes: [
        'id_contrato',
        'valor_canon',
        'fecha_inicio_contrato',
        'fecha_fin_contrato',
      ],
      include: [
        {
          model: con.models.autorizado,
          as: 'id_autorizado_autorizado',
          attributes: ['metodo_pago', 'entidad_bancaria', 'numero_cuenta'],
          include: [
            {
              model: con.models.cliente,
              as: 'id_cliente_cliente',
              attributes: [
                'numero_documento',
                'nombres',
                'tipo_documento',
                'razon_social',
              ],
            },
            {
              model: con.models.entidad_bancaria,
              as: 'entidad_bancaria_entidad_bancarium',
            },
          ],
        },
        {
          model: con.models.punto_de_venta,
          as: 'id_punto_venta_punto_de_ventum',
          where: { codigo_sitio_venta: sitioVenta },
          attributes: [
            'codigo_sitio_venta',
            'nombre_comercial',
            'id_municipio',
          ],
          include: [
            {
              model: con.models.municipio,
              as: 'id_municipio_municipio',
              attributes: ['municipio'],
            },
          ],
        },
        {
          model: con.models.contrato_conceptos,
          as: 'contrato_conceptos',
          attributes: ['valor'],
          include: [
            {
              model: con.models.conceptos,
              as: 'id_concepto_concepto',
              attributes: [
                'nombre_concepto',
                'codigo_concepto',
                'tipo_concepto',
              ],
            },
          ],
        },
      ],
    });
    return result;
  }

  async traerConceptosPagado(sitioVenta, fecha_periodo) {
    const result = await con.models.contrato.findAll({
      attributes: ['id_contrato', 'valor_canon'],
      include: [
        {
          model: con.models.autorizado,
          as: 'id_autorizado_autorizado',
          attributes: ['metodo_pago', 'entidad_bancaria', 'numero_cuenta'],
          include: [
            {
              model: con.models.cliente,
              as: 'id_cliente_cliente',
              attributes: [
                'numero_documento',
                'nombres',
                'apellidos',
                'tipo_documento',
                'razon_social',
              ],
            },
            {
              model: con.models.entidad_bancaria,
              as: 'entidad_bancaria_entidad_bancarium',
            },
          ],
        },
        {
          model: con.models.punto_de_venta,
          as: 'id_punto_venta_punto_de_ventum',
          where: { codigo_sitio_venta: sitioVenta },
          attributes: [
            'codigo_sitio_venta',
            'nombre_comercial',
            'id_municipio',
          ],
          include: [
            {
              model: con.models.municipio,
              as: 'id_municipio_municipio',
              attributes: ['municipio'],
            },
          ],
        },
        {
          model: con.models.pago_arriendo,
          as: 'pago_arriendos',
          where: { fecha_periodo: fecha_periodo },
          attributes: ['valor', 'fecha_pago', 'fecha_periodo'],
          include: [
            {
              model: con.models.pago_concepto,
              as: 'pago_conceptos',
              attributes: ['id_concepto', 'pago_concepto_valor'],
              include: [
                {
                  model: con.models.conceptos,
                  as: 'id_concepto_concepto',
                },
              ],
            },
          ],
        },
        // {
        //   model: 'pago_arriendos',
        //   where: { fecha_periodo: fecha_periodo },
        //   attributes: ['valor', 'fecha_pago', 'fecha_periodo'],
        //   include: {
        //     association: 'id_pago_arriendo_pago_arriendo',
        //     include: 'id_concepto_concepto',
        //     attributes: ['id_concepto', 'pago_concepto_valor'],
        //   },
        // },
      ],
    });
    return result;
  }
  async findCodigoSitioVentaByFilter(filter) {
    let whereConditionEntidadBancaria = {};
    let whereConditionAutorizado = {};

    switch (filter) {
      case 'bancolombia':
        whereConditionEntidadBancaria = { entidad_bancaria: 'Bancolombia' };
        break;
      case 'otros-bancos':
        whereConditionEntidadBancaria = {
          entidad_bancaria: { [Op.ne]: 'Bancolombia' },
        };
        break;
      case 'efectivo':
        whereConditionAutorizado = { metodo_pago: 2 };
        break;
      case 'todos-bancos':
        // no se aplica filtro en este caso, por lo tanto, las condiciones where se quedan vacías
        break;
      default:
        throw new Error('Filter not recognized');
    }

    const results = await con.models.contrato.findAll({
      include: [
        {
          model: con.models.autorizado,
          as: 'id_autorizado_autorizado',
          where: whereConditionAutorizado, // aplicamos aquí la condición where para autorizado
          include: [
            {
              model: con.models.entidad_bancaria,
              as: 'entidad_bancaria_entidad_bancarium',
              where: whereConditionEntidadBancaria, // aplicamos aquí la condición where para entidad bancaria
            },
          ],
        },
        {
          model: con.models.punto_de_venta,
          as: 'id_punto_venta_punto_de_ventum',
          attributes: ['codigo_sitio_venta'],
        },
      ],
    });

    // Extraer los codigos de sitio de venta de los resultados
    const codigosSitioVenta = results.map(
      (result) => result.id_punto_venta_punto_de_ventum.codigo_sitio_venta
    );

    return codigosSitioVenta;
  }
  async darIncrementoCanon(id_contrato) {
    const [result] = await con.query(
      `Select * from arriendos.calcular_canon_con_incremento(?)`,
      {
        replacements: [id_contrato],
      }
    );
    return result;
  }
}
module.exports = ContratoService;
