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
      throw console.error('No se encontro');
    }
    return rta;
  }

}
module.exports = MetodoPagoService;
