const con = require('../libs/sequelize');

class MircroZonaService{

  constructor(){
  }

  async find() {

    const data = await con.models.microzona.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.microzona.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async findByZonaId(id){
    const micro = con.models.microzona.findAll({
      where: {
        id_zona:id
      }
    })
    if(!micro){
      throw console.error('no se encontro');
    }
    return micro;
  }
}
module.exports = MircroZonaService;
