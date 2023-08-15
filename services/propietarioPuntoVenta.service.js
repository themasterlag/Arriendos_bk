const con = require('../libs/sequelize');

class PropietarioPuntoVentaService{

  constructor(){

  }
  async create(data) {
    const prop_punto_venta = await con.models.propietario_punto_venta.create(data);
    return prop_punto_venta.id_punto_venta;
  }

  async find() {

    const data = await con.models.propietario_punto_venta.findAll();
    return data;
  }

  async findOne(id) {

    const rta = await con.models.propietario_punto_venta.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

  async update(id, changes) {

    const proPuntoDeVenta =  await this.findOne(id);

    const rta = await proPuntoDeVenta.update(changes);

    return rta;
  }

  async delete(id) {
    const proPuntoDeVenta =  await this.findOne(id);
    await proPuntoDeVenta.destroy()
    return 'eliminado'
  }
}
module.exports= PropietarioPuntoVentaService;
