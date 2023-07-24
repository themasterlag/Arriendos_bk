const con = require('../libs/sequelize');
const { Op } = require('sequelize');

class PagoArriendosService {
  constructor() {}
  async getLastDayOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  async findPagos() {
    const results = await con.models.pago_arriendo.findAll();
    return results;
  }
  async savePago(data) {
    const pago = await con.models.pago_arriendo.create(data);
    return pago.id_pago_arriendo;
  }

  async findOne(id) {
    const pago = await con.models.pago_arriendo.findAll({
      where: {
        id_pago_arriendo: id,
      },
      include: [
        {
          model: con.models.pago_detalle,
          as: 'pagodetalle',
          include: [
            {
              model: con.models.responsable,
              association: 'responsabledetalle',
              include: {
                model: con.models.cliente,
                as: 'clientedetalle',
              },
            },
            {
              model: con.models.autorizado,
              as: 'autdetalle',
              include: {
                model: con.models.cliente,
                as: 'clientedetalle',
              },
            },
            {
              model: con.models.autorizado_administracion,
              as: 'autadmdetalle',
              include: {
                model: con.models.cliente,
                as: 'clientedetalle',
              },
            },
            {
              model: con.models.punto_de_venta,
              as: 'pvdetalle',
            },
          ],
        },
      ],
    });
    if (!pago) {
      throw new Error('no se encontro');
    }
    return pago;
  }

  async findArriendos() {
    // let  consulta = 'SELECT arriendos.contrato.valor_canon AS Canon, arriendos.punto_de_venta.nombre_comercial, arriendos.cliente.numero_documento AS cc,arriendos.cliente.nombres AS nombre, CASE WHEN arriendos.responsable.iva = true THEN (arriendos.contrato.valor_canon)*(0.19) ELSE 0 END AS Iva, CASE WHEN arriendos.responsable.rete_iva = true THEN (arriendos.contrato.valor_canon)*(0.19)*(0.15) ELSE 0 END AS RETE_IVA, CASE WHEN arriendos.responsable.rete_fuente = true THEN ((arriendos.contrato.valor_canon)*(0.035)) ELSE 0 END AS RETE_FUENTE, (arriendos.contrato.valor_canon * arriendos.impuestos_reteica.impuesto) AS RETEICA, ((arriendos.contrato.valor_canon * arriendos.impuestos_reteica.impuesto) * arriendos.impuestos_bomberil.impuesto) AS BOMBERIL  FROM  arriendos.contrato,arriendos.punto_de_venta,arriendos.responsable,arriendos.cliente,arriendos.municipio, arriendos.impuestos_reteica, arriendos.impuestos_bomberil  WHERE arriendos.contrato.id_punto_venta = arriendos.punto_de_venta.id_punto_venta AND arriendos.contrato.id_responsable = arriendos.responsable.id_responsable AND arriendos.responsable.id_cliente = arriendos.cliente.id_cliente AND arriendos.punto_de_venta.id_municipio = arriendos.municipio.id_municipio AND arriendos.punto_de_venta.id_municipio = arriendos.impuestos_reteica.id_municipio AND arriendos.punto_de_venta.id_municipio = arriendos.impuestos_bomberil.id_municipio'
    const [results] = await con.query(
      'select  * from arriendos.get_arriendos()'
    );
    /* results.map( r =>{
          //valor total canon + iva + rete iva + rete fuente + reteica + bombelir
         r.valor_total = r.canon + parseInt(r.iva) -  parseInt(r.rete_iva) -  parseInt(r.rete_fuente) - r.reteica - r.bomberil;
         return r;
  }) */
    return results;
  }
  async findAllArriendosByCodigosSitioVenta(codigos) {
    console.log(codigos);
    const [results] = await con.query(
      `select  * from arriendos.get_arriendos() where codigo_sitio_venta in (${codigos})`
    );
    return results;
  }
  async findOneArriendoByCodigoSitioVenta(codigo) {
    const [results] = await con.query(
      `select  * from arriendos.get_arriendos() where codigo_sitio_venta = ${codigo} limit 1`
    );

    return results;
  }
  async traerConceptosByCodigoSitioVenta(codigo) {
    const [results] =
      await con.query(`SELECT c.codigo_concepto, c.nombre_concepto 
      FROM arriendos.conceptos c 
      INNER JOIN arriendos.contrato_conceptos cc ON c.id_concepto = cc.id_concepto 
      INNER JOIN arriendos.contrato ct ON cc.id_contrato = ct.id_contrato 
      INNER JOIN arriendos.punto_de_venta pv ON ct.id_punto_venta = pv.id_punto_venta 
      WHERE pv.codigo_sitio_venta = ${codigo}`);
    return results;
  }

  async findArriendosByFitler(filter, tipo, rangoFechas) {
    function getLastDayOfMonth(year, month) {
      console.log(year, month, 'year month');
      return new Date(year, month, 0).getDate();
    }
    let ultimoDiaMes = await getLastDayOfMonth(
      rangoFechas.anio,
      rangoFechas.mes
    );
    console.log(ultimoDiaMes, 'ultimo dia del mes');
    let query = `select arriendos.* 
    from arriendos.get_arriendos() as arriendos 
    left join arriendos.pago_arriendo 
      on arriendos.id_contrato = pago_arriendo.id_contrato `;

    if (tipo == 1) {
      query =
        query +
        `where
        pago_arriendo.id_contrato is null
        and arriendos.fecha_inicio_contrato BETWEEN '` +
        rangoFechas.anio +
        '-' +
        rangoFechas.mes +
        '-01' +
        `' AND '` +
        rangoFechas.anio +
        '-' +
        ultimoDiaMes +
        `'`;
    } else {
      query =
        query +
        `where
        pago_arriendo.id_contrato is not null
        and pago_arriendo.fecha_pago BETWEEN '` +
        rangoFechas.anio +
        '-' +
        rangoFechas.mes +
        '-01' +
        `' AND '` +
        rangoFechas.anio +
        '-' +
        rangoFechas.mes +
        '-' +
        ultimoDiaMes +
        `'`;
    }

    let [results] = await con.query(query);

    return results.filter((r) => {
      if (filter.no_responsable && filter.responsable && filter.efectivo) {
        return r;
      } else if (filter.no_responsable && filter.responsable) {
        return r.iva === 0 || r.iva !== 0;
      } else if (filter.no_responsable && filter.efectivo) {
        return r.iva === 0 || r.metodo_pago === 2;
      } else if (filter.responsable && filter.efectivo) {
        return r.iva !== 0 || r.metodo_pago === 2;
      } else if (filter.no_responsable) {
        return r.iva === 0;
      } else if (filter.responsable) {
        return r.iva !== 0;
      } else if (filter.efectivo) {
        return r.metodo_pago === 2;
      } else {
        return r;
      }
    });
  }

  async findPagados(fechaInicio, fechaFin) {
    try {
      const results = await con.models.pago_arriendo.findAll({
        where: {
          fecha_periodo: {
            [Op.between]: [fechaInicio, fechaFin],
          },
        },
        include: [
          {
            model: con.models.contrato,
            as: 'contratodetalle',
            include: [
              {
                model: con.models.punto_de_venta,
                as: 'pvdetalle',
              },
            ],
          },
        ],
      });
      return results;
    } catch (error) {
      console.error('Error al obtener los registros pagados', error);
    }
  }
  async findRegistrosBancolombia() {
    const [results] =
      await con.query(`SELECT * from arriendos.get_arriendos() where entidad_bancaria = 'Bancolombia'
    Order by numero_cuenta ASC
    `);
    return results;
  }
  async findRegistrosByOtrosBancos() {
    const [results] =
      await con.query(`SELECT * from arriendos.get_arriendos() where entidad_bancaria != 'Bancolombia'
      Order by entidad_bancaria ASC, nombre ASC
    `);
    return results;
  }
  async findRegistrosByEfectivo() {
    const [results] =
      await con.query(`SELECT * from arriendos.get_arriendos() where metodo_pago = 2
      Order by cedula ASC
    `);
    return results;
  }

  async findRegistros(periodo, anio) {
    const allRecords = await this.findArriendos();
    const [results] = await con.query(
      `Select distinct * from arriendos.get_arriendos(?, ?)`,
      {
        replacements: [periodo, anio],
      }
    );
    // Check if the results array contains one or multiple records
    if (results == null) {
      // If the results array is empty, return all records
      console.log('no hay registros');
      return allRecords;
    } else if (results.length == 1) {
      console.log('hay un registro');
      const recordToDelete = results[0];
      console.log(recordToDelete.id_contrato);
      const updatedRecords = allRecords.filter(
        (record) =>
          !(
            record.id_contrato === recordToDelete.id_contrato &&
            record.id_punto_venta === recordToDelete.id_punto_venta
          )
      );
      return updatedRecords;
    } else {
      // If the results array contains multiple records, delete those records from the allRecords array
      console.log('hay un array');
      const recordsToDelete = results;
      console.log(recordsToDelete);
      const callback = (element) =>
        !recordsToDelete.some(
          (e) =>
            e.id_contrato === element.id_contrato &&
            e.id_punto_venta === element.id_punto_venta
        );
      const updatedRecords = allRecords.filter(callback);
      return updatedRecords;
    }
  }

  async createLiquidacion(data) {
    const newLiquidacion = await con.models.liquidacion.create(data);
    return newLiquidacion.id_liquidacion;
  }
  async findNoPagados(fechaInicio, fechaFin, filter) {
    const [contratos] = await con.query(
      `SELECT * from arriendos.calcular_valor_total_filtrado(?,?,?,?,?)`,
      {
        replacements: [
          fechaInicio,
          fechaFin,
          filter.no_responsable,
          filter.responsable,
          filter.efectivo,
        ],
      }
    );

    // Iterar sobre los contratos para obtener los conceptos
    for (const contrato of contratos) {
      const conceptos = await con.models.contrato_conceptos.findAll({
        where: {
          id_contrato: contrato.id_contrato,
        },
        include: {
          model: con.models.conceptos,
          as: 'conceptodetalle',
        },
      });

      // Añadir los conceptos al objeto contrato
      contrato.conceptos = conceptos;
    }

    return contratos;
  }

  async registrarPagos(data) {
    const newPago = await con.models.pago_arriendo.create(data);
    return {id_pago_arriendo:newPago.id_pago_arriendo,
            id_contrato: newPago.id_contrato};
  }

  //metodo para devolver la info pagada de contratos de un rango de fechas y banco o si es efectivo
  // 5 2022
  async findReportePorFechaYTipoPago(year,month, tipoReporte){
    let whereConditionEntidadBancaria = {};
    let whereConditionAutorizado = {};
    switch (tipoReporte) {
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
    const result = await con.models.pago_arriendo.findAll({
      attributes: ['id_pago_arriendo','canon'],
      include:[
        
        {
          model : con.models.contrato,
          as: 'contratodetalle',
          attributes: ['id_contrato'],
          required: true,
          include:[
            {
              model: con.models.autorizado,
              as: 'autdetalle',
              attributes:['numero_cuenta'],  
              where: whereConditionAutorizado,
              required: true,
              include:[
                {
                  model: con.models.entidad_bancaria,
                  as: 'entidadbancaria',
                  attributes: ['entidad_bancaria'],
                  where: whereConditionEntidadBancaria,
                  require: true,
                },
                {
                  model: con.models.cliente,
                  as: 'clientedetalle',
                  attributes: [
                    'numero_documento',
                    'nombres',
                    'apellidos',
                    'tipo_documento',
                    'razon_social',
                    'digito_verificacion'
                  ],
                }
              ]
            },
            {
              model:con.models.punto_de_venta,
              as: 'pvdetalle',
              attributes: ['codigo_sitio_venta', 'nombre_comercial',],
              include:[
                {
                  model: con.models.municipio,
                  as: 'municipiodetalle',
                  attributes: ['municipio'],
                },
              ],
            },
          ],
        },
       // aqui seria la parte de pago_conceptos
       {
        model: con.models.pago_concepto,
        as: 'contconceptos',
        attributes: ['pago_concepto_valor', 'id_concepto'],
        include:[
          {
            model: con.models.conceptos,
            as : 'conceptodetalle',
           attributes: ['codigo_concepto','nombre_concepto', 'tipo_concepto']
          }
        ]
       }
      
      ],
      where: con.literal('EXTRACT(YEAR FROM fecha_periodo) = '+year+' AND EXTRACT(MONTH FROM fecha_periodo) = '+month),
    })
    
    return result
  }
  
}

module.exports = PagoArriendosService;
