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
      throw {message: 'no se encontro', codigo:404};
    }
    return zona;
  }


}

module.exports = ZonaService;
