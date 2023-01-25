const con = require('../libs/sequelize');

class AutorizadoService{

  constructor(){

  }

  async create(data) {
    const autorizado = await con.models.autorizado.create(data);
    return autorizado;
  }

  async find() {
    const data = await con.models.autorizado.findAll();
    return data;
  }

  async findOne(id) {

    const rta = await con.models.autorizado.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const autorizado =  await this.findOne(id);

    const rta = await autorizado.update(changes);

    return rta;
  }

  async delete(id) {
    const autorizado =  await this.findOne(id);
    await autorizado.destroy()
    return 'eliminado'
  }
}
module.exports = AutorizadoService;
