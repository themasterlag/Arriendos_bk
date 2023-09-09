const con = require('../libs/sequelize');
const proceso = require('../models/proceso');

class ProcesoService{

  constructor(){

  }

  async find(){
    const data = con.models.proceso.findAll({
      order: [
        ['id_proceso', 'ASC']
      ]
    });
    return data;
  }

  async findOnde(id){

    const rta = await con.models.proceso.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

   async create(data){

    const rta = await con.models.proceso.findAll({
      where: {nombre_proceso: data.nombre_proceso},
  });

  if(rta.length == 0){
    const proceso = await con.models.proceso.create(data);
    return proceso;
  } else {
      throw {message: 'proceso existente', codigo:404};
  }

   }

   async update(id, data){
    const proceso = await this.findOnde(id)
    console.log(proceso)
    const rta = await proceso.update(data)
    return rta
  }

  async delete(id){
    const proceso = await this.findOnde(id)
    await proceso.destroy()
    return 'eliminado'
  }
  }
module.exports = ProcesoService;
