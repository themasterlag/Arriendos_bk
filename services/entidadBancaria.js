const con = require('../libs/sequelize');

class EntidadBancariaService{

  constructor(){

  }

  async find(){
    const data = await con.models.entidad_bancaria.findAll({
      order: [
        ['entidad_bancaria', 'ASC']
      ]
    });

    return data;
  }

  async findOne(id){
    const rta = await con.models.entidad_bancaria.findByPk(id);
    if(!rta){
      throw console.error('No se encontro');
    }
    return rta;
  }
}
module.exports = EntidadBancariaService;
