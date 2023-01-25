const con = require('../libs/sequelize');

class ArrendadorContratoService{
  constructor( ){

  }

  async create(data){
    const arrendadorContrato = con.models.arrendador_contrato.create(data);
    return arrendadorContrato;
  }

  async find() {

    const data = await con.models.arrendador_contrato.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.arrendador_contrato.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const arrendadorContrato =  await this.findOne(id);

    const rta = await arrendadorContrato.update(changes);

    return rta;
  }

  async delete(id) {
    const arrendador =  await this.findOne(id);
    await arrendador.destroy()
    return 'eliminado'
  }
}
module.exports = ArrendadorContratoService;
