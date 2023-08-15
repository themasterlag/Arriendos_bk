const con = require('../libs/sequelize');
// eslint-disable-next-line no-unused-vars
const { Op } = require('sequelize');
class IncrementoContratoService {
  constructor() {}
  async create(data) {
    const incrementoContrato = await con.models.incremento_contrato.create(
      data
    );
    return incrementoContrato.id_incremento_contrato;
  }

  async findAllIncrementos() {
    const result = await con.models.incremento_contrato.findAll();
    return result;
  }
  async findOneIncremento(id) {
    const rta = await con.models.incremento_contrato.findByPk(id);
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  async update(id, changes) {
    const incremento = await this.findOneIncremento(id);

    const rta = await incremento.update(changes);

    return rta;
  }
}

module.exports = IncrementoContratoService;
