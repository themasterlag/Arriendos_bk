const con = require('../libs/sequelize');

class ZonaService{

  constructor(){

  }

  async find(){
    const data = await con.models.zona.findAll();
    return data;
  }

  async findOne(id){
    const zona = await con.models.zona.findByPk(id);
    if(!zona){
      throw console.error('no se encontro');
    }
    return zona;
  }


}

module.exports = ZonaService;
