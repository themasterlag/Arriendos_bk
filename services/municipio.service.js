// eslint-disable-next-line no-unused-vars
const { compare } = require('bcryptjs');
const con = require('../libs/sequelize')

class MunicipioService{

  constructor(){

  }

  async find(){
    const data = con.models.municipio.findAll({
      order: [
        ['municipio', 'ASC']
      ]
    });
    return data;
  }
  async findOne(id){
    const rta = await con.models.municipio.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  async findByIdDepartamento(id){
    const rta = await con.models.municipio.findAll({
      where: {
        id_departamento: id
      },
      order: [
        ['municipio', 'ASC']
      ]
    })
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
}
module.exports = MunicipioService;
