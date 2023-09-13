const con = require('../libs/sequelize');

class SaldoCreditoService {
  constructor() {}

  async create(data) {
    const concepto = await con.models.contrato_conceptos.create(data);
    data["contrato_concepto_id"] = concepto.id_contrato_concepto;
    data["credito_saldo"] = data.credito_total;
    const saldo_credito = await con.models.saldo_credito.create(data);
    return saldo_credito.id_saldo_credito;
  }
  async find() {
    const data = await con.models.saldo_credito.findAll();
    return data;
  }
  async findOne(id) {
    const rta = await con.models.saldo_credito.findByPk(id);
    if (!rta || rta.length == 0) {
      throw ({ message: 'no se encontro credito', codigo: 404})
    }
    return rta;
  }
  async findOneWithPagos(id){
    const rta = await con.models.saldo_credito.findOne({
      include:[
        {
          association: 'creditopagos',
          include: [
            {
              association: 'creditopagousuario'
            }
          ]
        },
      ],
      where: {
        id_saldo_credito: id
      }
    });
    if (!rta || rta.length == 0) {
      throw ({ message: 'no se encontro credito', codigo: 404})
    }
    return rta;
  }
  async findOneByIdContratoConcepto(id) {
    const [rta] = await con.models.saldo_credito.findAll(
      { where: { contrato_concepto_id: id } }
    );

    return rta;
  }
  async update(id, changes) {
    const conceptoAnterior = await con.models.contrato_conceptos.findOne({ where: { id_contrato_concepto: changes.id_contrato_concepto } });
    await conceptoAnterior.destroy();

    const concepto = await con.models.contrato_conceptos.create(changes);
    changes["contrato_concepto_id"] = concepto.id_contrato_concepto;

    const saldoCredito = await con.models.saldo_credito.findOne({ where: { id_saldo_credito: changes.id_saldo_credito } });
    const rta = await saldoCredito.update(changes);

    return rta;
    // return true;
  }
  async delete(id) {
    try{
      const saldoCredito = await this.findOne(id);
      const conceptoAnterior = await con.models.contrato_conceptos.findOne({ where: { id_contrato_concepto: saldoCredito.contrato_concepto_id } });
      await conceptoAnterior.destroy();
      await saldoCredito.destroy();
      return 'eliminado';
    }
    catch(error){
      throw { codigo:500, error: error}
    }
  }
  async findWithDetails(){
    const [data] = await con.query(
      `select  * from arriendos.saldo_credito as cre
        inner join arriendos.contrato_conceptos as con on cre.contrato_concepto_id = con.id_contrato_concepto
        inner join arriendos.contrato as contr on con.id_contrato = contr.id_contrato
        inner join arriendos.conceptos on conceptos.id_concepto = con.id_concepto
        inner join arriendos.punto_de_venta as punto on punto.id_punto_venta = contr.id_punto_venta`
    );
    return data;
  }

  async descontarSaldoByIdConcepto(id_contrato_concepto, valor) {
    const saldoCredito = await this.findOneByIdContratoConcepto(id_contrato_concepto);
    let newSaldoCredito;

    if (saldoCredito) {
      let saldo = (saldoCredito.credito_saldo - valor);
      newSaldoCredito = await con.query(
        `UPDATE arriendos.saldo_credito
            SET credito_saldo = `+ saldo +`
          WHERE id_saldo_credito = `+ saldoCredito.id_saldo_credito +` 
            AND (NOW() BETWEEN fecha_inicio and fecha_fin)`
      );
    }

    return newSaldoCredito;
  }

  async abonarSaldoCredito(id_saldo_credito, abono){
    try{
      let credito = await this.findOne(id_saldo_credito);
      credito.update({credito_saldo: credito.credito_saldo-abono});

      let conceptoContrato = await con.models.contrato_conceptos.findOne({ 
        where: { 
          id_contrato_concepto: credito.contrato_concepto_id 
        } 
      });

      let hoy = new Date();
      let fecha_fin = new Date(credito.fecha_fin);
      let mesesFaltantes = (fecha_fin.getFullYear() - hoy.getFullYear()) * 12 + (fecha_fin.getMonth() - hoy.getMonth()) + 1;


      if (mesesFaltantes >= 0) {
        conceptoContrato.update({valor: Math.ceil(credito.credito_saldo / mesesFaltantes)});
      }

      return credito;
    }
    catch(error){
      throw {codigo:500, message:error}
    }
  }
}
module.exports = SaldoCreditoService;
