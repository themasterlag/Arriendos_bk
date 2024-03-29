const con = require('../libs/sequelize');

class DepartamentoService {
  constructor() {}

  async find() {
    const data = await con.models.departamento.findAll();

    return data;
  }
  async findByIdMunicipio(id) {
    const [result] =
      await con.query(`SELECT * FROM arriendos.departamento WHERE id_departamento = ( 
      SELECT id_departamento FROM arriendos.municipio WHERE id_municipio =${id})`);
    return result;
  }
  async findOne(id) {
    const rta = await con.models.departamento.findByPk(id);
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
}
module.exports = DepartamentoService;
