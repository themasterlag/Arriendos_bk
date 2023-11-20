const con = require('../libs/sequelize');

class TipoPagoNovedadesService{

  constructor(){

  }

  async find(){
    const data = con.models.tipo_pago_novedades.findAll();
    return data;
  }

  async findOne(id){
    const rta = await con.models.tipo_pago_novedades.findByPk(id);
    
    if(!rta){
      throw {message: 'no se encontro tipo', codigo:404};
    }
    
    return rta;
  }

  async create(data){
    const rta = await con.models.tipo_pago_novedades.create(data);
    return rta;
  }

  async update(data){
    const tipo = await con.models.tipo_pago_novedades.findByPk(data.id);
    
    if(!tipo){
      throw {message: 'no se encontro tipo', codigo:404};
    }
    
    const rta = await tipo.update(data);
    return rta;
  }
  
  async changeEstado(id){
    const tipo = await con.models.tipo_pago_novedades.findByPk(id);

    if (!tipo) {
      throw {message: 'no se encontro tipo', codigo:404};
    }

    const rta = tipo.update({estado: !tipo.estado});
    return rta;
  }
}

module.exports = TipoPagoNovedadesService;
