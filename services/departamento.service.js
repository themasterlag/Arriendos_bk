const con = require('../libs/sequelize');

class DepartamentoService{

  constructor(){

  }

  async find(){
    const data = await con.models.departamento.findAll();

    return data;
  }

  async findOne(id){
    const rta = await con.models.departamento.findByPk(id);
    if(!rta){
      throw console.error('No se encontro');
    }
    return rta;
  }
}
module.exports = DepartamentoService;
