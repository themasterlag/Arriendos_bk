const con = require('../libs/sequelize');

class ArrendadorService{

  constructor(){

  }

  async create(data) {
    const arrendador = await con.models.arrendador.create(data);
    return arrendador.id_arrendador;
  }

  async find() {

    const data = await con.models.arrendador.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.arrendador.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const arrendador =  await this.findOne(id);

    const rta = await arrendador.update(changes);

    return rta;
  }

  async delete(id) {
    const arrendador =  await this.findOne(id);
    await arrendador.destroy()
    return 'eliminado'
  }
}
module.exports = ArrendadorService;
