const con = require('../libs/sequelize');

class TipoCuentaService{

  constructor(){

  }

  async find(){
    const data = await con.models.tipo_cuenta.findAll();
    return data;
  }

  async findOne(id){
    const zona = await con.models.tipo_cuenta.findByPk(id);
    if(!zona){
      throw {message: 'no se encontro', codigo:404};
    }
    return zona;
  }
}
module.exports = TipoCuentaService;
