const con = require('../libs/sequelize');

class ContratoAutorizadoService{

  constructor(){

  }

  async create(data) {
    const newContratoAut = await con.models.contrato_autorizado.create(data);
    return newContratoAut;
  }

  async find() {
    const data = await con.models.contrato_autorizado.findAll();
    return data;
  }

  async findOne(id) {

    const rta = await con.models.contrato_autorizado.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const upContratoAut =  await this.findOne(id);

    const rta = await upContratoAut.update(changes);

    return rta;
  }

  async delete(id) {
    const delContratoAut =  await this.findOne(id);
    await delContratoAut.destroy()
    return 'eliminado'
  }
}
module.exports = ContratoAutorizadoService;
