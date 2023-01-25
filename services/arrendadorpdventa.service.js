const con = require('../libs/sequelize');

class ArrendadorPDVentaService{

  constructor(){

  }

  async create(data){
    const pdv = await con.models.arrendador_punto_de_venta.create(data);
    return pdv;
  }

  async find(){
    const data = await con.models.arrendador_punto_de_venta.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.arrendador_punto_de_venta.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const arrendadorpdv =  await this.findOne(id);

    const rta = await arrendadorpdv.update(changes);

    return rta;
  }

  async delete(id) {
    const arrendadorpdv =  await this.findOne(id);
    await arrendadorpdv.destroy()
    return 'eliminado'
  }
}
module.exports = ArrendadorPDVentaService;
