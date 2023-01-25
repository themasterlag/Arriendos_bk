const con = require('../libs/sequelize');

class PagoRealizadoArriendo{
  constructor(){

  }

  async getPagos(){
    const data = con.models.pago_arriendo.findAll()
    return data;
  }

  async pagarArriendo(data){
    const arriendoPagado = await con.models.pago_arriendo.create(data)
    return arriendoPagado.id_pago_arriendo;
  }
}
module.exports = PagoRealizadoArriendo
