const con = require('../libs/sequelize');

class TipoServicioService{

  constructor(){

  } async find(){
    const data = await con.models.tipo_servicio.findAll();
    return data;
  }

  async findOne(id){
    const servicio = await con.models.tipo_servicio.findByPk(id);
    if(!servicio){
      throw console.error('no se encontro');
    }
    return servicio;
  }

}
module.exports = TipoServicioService;
