const con = require('../libs/sequelize');

class PagoArriendosService {
  constructor() {}

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

  async findArriendosByFitler(filter) {
    const [results] = await con.query(
      `select  * from arriendos.get_arriendos()`
    );
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
  /** 
  async findArriendosByFilter(filter) {
    
    if (filter == 'responsablesIva') {
      const [results] = await con.query(
        ' select * from arriendos.get_arriendos() where iva != 0'
      );
      console.log(results);
      return results;
    } else if (filter == 'noResponsables') {
      const [results] = await con.query(
        ' select * from arriendos.get_arriendos() where iva = 0'
      );
      return results;
    } else if (filter == 'efectivo') {
      const [results] = await con.query(
        ' select * from arriendos.get_arriendos() where metodo_pago = 2'
      );
      return results;
    } else return [];
  }*/
  async findPagados(periodo, anio) {
    const [results] = await con.query(
      `Select distinct * from arriendos.get_arriendos(?, ?)`,
      {
        replacements: [periodo, anio],
      }
    );
    return results;
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
  async findLiquidaciones() {
    const data = await con.models.liquidacion.findAll();
    return data;
  }
}

module.exports = PagoArriendosService;
