// eslint-disable-next-line no-unused-vars
const { compare } = require('bcryptjs');
const con = require('../libs/sequelize')

class MunicipioService{

  constructor(){

  }

  async find(){
    const data = con.models.municipio.findAll();
    return data;
  }
  async findOne(id){
    const rta = await con.models.municipio.findByPk(id);
    if(!rta){
      throw console.error('No se encontro');
    }
    return rta;
  }
  async findByIdDepartamento(id){
    const rta = await con.models.municipio.findAll({
      where: {
        id_departamento: id
      }
    })
    if(!rta){
      throw console.error('No se encontro');
    }
    return rta;
  }
}
module.exports = MunicipioService;
