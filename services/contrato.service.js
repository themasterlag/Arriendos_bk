const con = require('../libs/sequelize');
const { Op } = require('sequelize');
class ContratoService {
  constructor() {}

  async create(data) {
    const contrato = await con.models.contrato.create(data);
    return contrato;
  }
  async findAllContratos() {
    const result = await con.models.contrato.findAll({
      include: [
        {
          model: con.models.punto_de_venta,
          as: 'pvdetalle',
          attributes: ['nombre_comercial', 'codigo_sitio_venta'],
        },
        {
          model: con.models.responsable,
          as: 'responsabledetalle',
          include: [
            {
              model: con.models.cliente,
              as: 'clientedetalle',
              attributes: ['numero_documento']
            }
          ]
        },
      ],
      order: [
        [{ model: con.models.punto_de_venta, as: 'pvdetalle' }, 'codigo_sitio_venta', 'ASC']
      ]
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
          association: 'autdetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'responsabledetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'autadmdetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'pvdetalle',
        },
      ],
    });
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  async findByPdv(id) {
    const rta = await con.models.contrato.findAll({
      include: [
        {
          association: 'responsabledetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'autdetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'pvdetalle',
        },
      ],
      where: {
        '$pvdetalle.codigo_sitio_venta$': id      
      }
    });

    if (!rta || rta.length == 0){
      throw {message: 'no se encontro', codigo:404};
    }

    return rta;
  }

  async findByCliente(tipo,documento) {
    let cliente = null;
    if(!tipo){
      throw {message: 'Falta tipo de cliente', codigo:400};
    } else{
      if (tipo == "responsable") {
        cliente = '$responsabledetalle.clientedetalle.numero_documento$';
      } else if (tipo == "autorizado"){
        cliente = '$autdetalle.clientedetalle.numero_documento$';
      }else{
        throw {message: 'Falta tipo de cliente', codigo:400};
      }
    }

    const rta = await con.models.contrato.findAll({
      include: [
        {
          association: 'responsabledetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'autdetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'pvdetalle',
        },
      ],
      where: {
        [cliente]: documento      
      }
    });

    if (!rta || rta.length == 0){
      throw {message: 'no se encontro', codigo:404};
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
    // console.log('Service ID: ', id);
    const contrato = await this.findOne(id);
    await contrato.update({
      fecha_inactivo: fecha_inactivo,
      razon_inactivo: razon_inactivo,
    });
    return contrato.id_contrato;
  }

  async renovarContrato(id, new_fecha_fin_contrato) {
    // console.log('Service ID: ', id);
    const contrato = await this.findOne(id);
    await contrato.update({
      fecha_fin_contrato: new_fecha_fin_contrato
    });
    return contrato.id_contrato;
  }

  async traerContratosConConceptos(id) {
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
          as: 'autdetalle',
          attributes: ['metodo_pago', 'entidad_bancaria', 'numero_cuenta'],
          include: [
            {
              model: con.models.cliente,
              as: 'clientedetalle',
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
              as: 'entidadbancaria',
            },
          ],
        },
        {
          model: con.models.punto_de_venta,
          as: 'pvdetalle',
          attributes: [
            'codigo_sitio_venta',
            'nombre_comercial',
            'id_municipio',
          ],
          include: [
            {
              model: con.models.municipio,
              as: 'municipiodetalle',
              attributes: ['municipio'],
            },
          ],
        },
        {
          model: con.models.contrato_conceptos,
          as: 'contconceptos',
          attributes: ['valor'],
          include: [
            {
              model: con.models.conceptos,
              as: 'conceptodetalle',
              attributes: [
                'nombre_concepto',
                'codigo_concepto',
                'tipo_concepto',
                'incremento',
              ],
            },
          ],
        },
      ],
      where: { id_contrato: id },
    });
    return result;
  }

  async traerConceptosPagado(id, fecha_periodo) {
    const result = await con.models.contrato.findAll({
      attributes: ['id_contrato', 'valor_canon', 'fecha_inicio_contrato','fecha_fin_contrato'],
      include: [
        {
          model: con.models.autorizado,
          as: 'autdetalle',
          attributes: ['metodo_pago', 'entidad_bancaria', 'numero_cuenta'],
          include: [
            {
              model: con.models.cliente,
              as: 'clientedetalle',
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
              as: 'entidadbancaria',
            },
          ],
        },
        {
          model: con.models.punto_de_venta,
          as: 'pvdetalle',
          attributes: [
            'codigo_sitio_venta',
            'nombre_comercial',
            'id_municipio',
          ],
          include: [
            {
              model: con.models.municipio,
              as: 'municipiodetalle',
              attributes: ['municipio'],
            },
          ],
        },
        {
          model: con.models.pago_arriendo,
          as: 'pagoarrdetalle',
          where: { fecha_periodo: fecha_periodo },
          attributes: ['valor', 'fecha_pago', 'fecha_periodo', 'canon'],
          include: [
            {
              model: con.models.pago_concepto,
              as: 'contconceptos',
              attributes: ['id_concepto', 'pago_concepto_valor'],
              include: [
                {
                  model: con.models.conceptos,
                  as: 'conceptodetalle',
                },
              ],
            },
          ],
        },
        {
          model: con.models.contrato_conceptos,
          as: 'contconceptos',
          attributes: ['valor'],
          include: [
            {
              model: con.models.conceptos,
              as: 'conceptodetalle',
              attributes: [
                'nombre_concepto',
                'codigo_concepto',
                'tipo_concepto',
                'incremento',
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
      where: { id_contrato: id },
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
          as: 'autdetalle',
          where: whereConditionAutorizado, // aplicamos aquí la condición where para autorizado
          include: [
            {
              model: con.models.entidad_bancaria,
              as: 'entidadbancaria',
              where: whereConditionEntidadBancaria, // aplicamos aquí la condición where para entidad bancaria
            },
          ],
        },
        {
          model: con.models.punto_de_venta,
          as: 'pvdetalle',
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
  async aplicarIncrementoValorCanon(id_contrato, valor_canon) {
    try {
      const cambios = { valor_canon: valor_canon };
      await this.update(id_contrato, cambios);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al intentar actualizar el valor del canon: ', error);
    }
  }

  async traerContratosRenovacionProxima(anio, mes){
    const hoy = new Date();
    const fin = new Date(anio, mes);
    // console.log(fin,'helooooooooo');
    
    const rta = await con.models.contrato.findAll({

      attributes: {
        exclude: ["id_autorizado", "id_autorizado_adm", "id_punto_venta", "id_responsable", "id_usuario"],
      },
      include: [
        {
          association: 'responsabledetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'autdetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'pvdetalle',
        },
      ],
      where: { 
        fecha_fin_contrato: {
          [Op.between]: [hoy, fin],
        },
        fecha_inactivo: {
          [Op.is]: null
        }
      }
    });
    // console.log(hoy, fin, '+++++++++')

    return rta;
  }

  // Método que obtiene todos los contratos a vencer del siguiente mes
  // Es utilizado en TareasProgramadas para envío de correos automáticos
  async traerContratosRenovacionSiguienteMes(){
    const hoy = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    const fin = new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1);
    console.log(hoy, fin);
    // console.log(fin,'helooooooooo');
    
    const rta = await con.models.contrato.findAll({

      attributes: {
        exclude: ["id_autorizado", "id_autorizado_adm", "id_punto_venta", "id_responsable", "id_usuario"],
      },
      include: [
        {
          association: 'responsabledetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'autdetalle',
          include: {
            association: 'clientedetalle',
          },
        },
        {
          association: 'pvdetalle',
        },
      ],
      where: { 
        fecha_fin_contrato: {
          [Op.between]: [hoy, fin],
        },
        fecha_inactivo: {
          [Op.is]: null
        }
      },
      order: [
        ['fecha_fin_contrato','ASC']
      ]
    });
    // console.log(hoy, fin, '+++++++++')

    return rta;
  }
}
module.exports = ContratoService;
