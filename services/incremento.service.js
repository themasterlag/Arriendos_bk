const con = require('../libs/sequelize');

class IncrementoService {
  constructor() {}

  async find() {
    const data = await con.models.incremento.findAll();
    return data;
  }
  async findOne(id) {
    const rta = await con.models.incremento.findByPk(id);
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  async update(id, changes) {
    const contrato = await this.findOne(id);

    const rta = await contrato.update(changes);

    return rta;
  }
}
module.exports = IncrementoService;
