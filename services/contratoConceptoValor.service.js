const con = require('../libs/sequelize');

class ContratoConceptoValorService {
  constructor() {}
  async save(data) {
    const contratoConceptoValor =
      await con.models.contrato_concepto_valor.create(data);
    return contratoConceptoValor.id_contrato_concepto_valor;
  }
  async find() {
    const data = await con.models.contrato_concepto_valor.findAll();
    return data;
  }
  async findOne(id) {
    const rta = await con.models.contrato_concepto_valor.findByPk(id);
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }
}
module.exports = ContratoConceptoValorService;
