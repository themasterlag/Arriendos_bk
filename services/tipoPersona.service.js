const con = require('../libs/sequelize')

class TipoPersonaService{

  constructor(){

  }

  async find(){
    const data = con.models.tipo_persona.findAll();
    return data;
  }
  async findOne(id){
    const rta = await con.models.tipo_persona.findByPk(id);
    if(!rta){
      throw console.error('No se encontro');
    }
    return rta;
  }
}

module.exports = TipoPersonaService;
