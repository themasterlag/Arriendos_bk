// eslint-disable-next-line no-unused-vars
const { compare } = require('bcryptjs');
const con = require('../libs/sequelize')

class novedadesService{

  constructor(){

  }

  async find(){
    const data = con.models.novedades.findAll();
    return data;
  }  

  async findOne(id){
    const rta = await con.models.novedades.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

  async create(datos){
    const rta = await con.models.novedades.create(datos);
  }
}
module.exports = novedadesService;
