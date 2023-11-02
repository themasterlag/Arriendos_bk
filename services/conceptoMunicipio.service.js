const con = require('../libs/sequelize');

class ConceptoMunicipioService {
  constructor() {}

  async findAll() {
    const [data] = await con.query(
      `select * from arriendos.concepto_municipio`
    );
    return data;
  }
  async findAllConceptoMunicipio() {
    const results = await con.models.concepto_municipio.findAll();
    return results;
  }
}
module.exports = ConceptoMunicipioService;
