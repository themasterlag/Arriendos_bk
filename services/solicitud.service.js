const con = require('../libs/sequelize');

class SolicitudService{

  constructor(){

  }

  async create(data) {
    const solicitud = await con.models.solicitud.create(data);
    return solicitud;
  }

  async find(){
    const data = con.models.solicitud.findAll();
    return data;
  }

  async findOne(id){
    const rta = await con.models.solicitud.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const solicitud =  await this.findOne(id);

    const rta = await solicitud.update(changes);

    return rta;
  }

  async delete(id) {
    const solicitud =  await this.findOne(id);
    await solicitud.destroy()
    return 'eliminado'
  }

}
module.exports = SolicitudService;
