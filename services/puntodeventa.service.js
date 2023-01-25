const con = require('../libs/sequelize');


class PuntoDeVentaService{

  constructor(){

  }

  async create(data) {
    const punto_venta = await con.models.punto_de_venta.create(data);
    return punto_venta.id_punto_venta;
  }

  async find() {

    const data = await con.models.punto_de_venta.findAll();
    return data;
  }

  async findOne(id) {

    const rta = await con.models.punto_de_venta.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const puntoDeVenta =  await this.findOne(id);

    const rta = await puntoDeVenta.update(changes);

    return rta;
  }

  async delete(id) {
    const puntoDeVenta =  await this.findOne(id);
    await puntoDeVenta.destroy()
    return 'eliminado'
  }
}
module.exports = PuntoDeVentaService;
