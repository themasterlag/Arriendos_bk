const con = require('../libs/sequelize');

class MetodoPagoService{

  constructor(){

  }

  async find(){
    const data = await con.models.metodo_pago.findAll();

    return data;
  }

  async findOne(id){
    const rta = await con.models.metodo_pago.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

}
module.exports = MetodoPagoService;
