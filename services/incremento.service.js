const con = require('../libs/sequelize');
const incremento = require('../models/incremento');

class IncrementoService {
  constructor() {}

  async find() {
    const data = await con.models.incremento.findAll();
    return data;
  }

  async delete(id){
    try{
    const incremento = await this.findOne(id);
    await incremento.destroy();
    return 'eliminado';

    }catch (error) {
    if (error) {
      throw { 
          message: 
          'No se puede eliminar el incremento por que esta siendo utilizado.'
          , codigo: 404 };
    } else {
      throw error;
    }
  }
}
  

  async findOne(id) {
    const rta = await con.models.incremento.findByPk(id);
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

  async create(data){

    const rta = await con.models.incremento.findAll({
      where: {nombre_incremento: data.nombre_incremento},
  });

  if(rta.length == 0){
    const incremento = await con.models.incremento.create(data);
    return incremento;
  } else {
      throw {message: 'incremento existente', codigo:404};
  }

   }

   async update(id, data){
    const incremento = await this.findOne(id)
    console.log(incremento)
    const rta = await incremento.update(data)
    return rta
  }
}


module.exports = IncrementoService;
