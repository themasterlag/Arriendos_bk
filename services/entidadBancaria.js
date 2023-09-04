const con = require('../libs/sequelize');

class EntidadBancariaService{

  constructor(){

  }

  async create(data) {
    const entidad_bancaria = await con.models.entidad_bancaria.create(data);
    return entidad_bancaria;
  }
   
  async find(){
    const data = await con.models.entidad_bancaria.findAll({
      order: [
        ['entidad_bancaria', 'ASC']
      ]
    });

    return data;
  }

  async findOne(id){
    const rta = await con.models.entidad_bancaria.findByPk(id);
    if(!rta){ 
      throw new Error('Entidad bancaria no encontrada');
    }
    return rta;
  }

  async findByNombre(nombre) {
    const rta = await con.models.banco.findOne({
      where: {
        nombre_banco: nombre
      }
    });
  
    if (!rta) {
      throw { message: 'No se encontró el banco', codigo: 404 };
    }
  
    return rta;
  }
  

  async update(id, data){
    const entidad_bancaria = await this.findOne(id)
    const rta = await entidad_bancaria.update(data)
    return rta
}

async delete(id){
  const entidad_bancaria = await this.findOne(id)
  await entidad_bancaria.destroy()
  return 'eliminado'
}



async modify(id, nuevoNombre) {
  const entidad_bancaria = await this.findOne(id);
  const rta = await entidad_bancaria.update({ entidad_bancaria: nuevoNombre }); // Actualizar el nombre
  return rta;
}
}
module.exports = EntidadBancariaService;
