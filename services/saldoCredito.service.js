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
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }
  async update(id, changes) {
    const conceptoAnterior = await con.models.contrato_conceptos.findOne({ where: { id_contrato_concepto: changes.id_contrato_concepto } });
    await conceptoAnterior.destroy();

    const concepto = await con.models.contrato_conceptos.create(changes);
    changes["contrato_concepto_id"] = concepto.id_contrato_concepto;

    const saldoCredito = await con.models.saldo_credito.findOne({ where: { id_saldo_cretido: changes.id_saldo_cretido } });
    const rta = await saldoCredito.update(changes);

    return rta;
    // return true;
  }
  async delete(id) {
    const saldoCredito = await this.findOne(id);
    await saldoCredito.destroy();
    return 'eliminado';
  }
  async findWithDetails(){
    const [data] = await con.query(
      `select  * from arriendos.saldo_credito as cre
        inner join arriendos.contrato_conceptos as con on cre.contrato_concepto_id = con.id_contrato_concepto
        inner join arriendos.contrato as contr on con.id_contrato = contr.id_contrato
        inner join arriendos.conceptos on conceptos.id_concepto = con.id_concepto`
    );
    return data;
  }
}
module.exports = SaldoCreditoService;
