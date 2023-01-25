const con = require('../libs/sequelize');

class RolService{

  constructor(){

  }

  async create(data) {
    const rol = await con.models.rol.create(data);
    return rol;
  }

  async find() {

    const data = await con.models.rol.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.rol.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const rol =  await this.findOne(id);

    const rta = await rol.update(changes);

    return rta;
  }

  async delete(id) {
    const rol =  await this.findOne(id);
    await rol.destroy()
    return 'eliminado'
  }
}
module.exports= RolService;
