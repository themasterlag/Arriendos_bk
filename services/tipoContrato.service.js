const con = require('../libs/sequelize');

class TipoContratoService{

  constructor(){

  }

  async find(){
    const data = await con.models.tipo_contrato.findAll();

    return data;
  }

  async findOne(id){
    const rta = await con.models.tipo_contrato.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
}
module.exports = TipoContratoService;
