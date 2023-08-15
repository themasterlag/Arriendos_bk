const con = require('../libs/sequelize');

class ProcesoService{

  constructor(){

  }

  async find(){
    const data = con.models.proceso.findAll();
    return data;
  }

  async findOnde(id){
    const rta = await con.models.proceso.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  }
module.exports = ProcesoService;
