const con = require('../libs/sequelize');

class SaldoCreditoService {
  constructor() {}

  async create(data) {
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
    const saldoCredito = await this.findOne(id);

    const rta = await saldoCredito.update(changes);

    return rta;
  }
  async delete(id) {
    const saldoCredito = await this.findOne(id);
    await saldoCredito.destroy();
    return 'eliminado';
  }
}
module.exports = SaldoCreditoService;
