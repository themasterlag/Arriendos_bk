const con = require('../libs/sequelize');

class SaldoCreditoService {
  constructor() {}

  async create(data) {
    try{
        const credito = await con.models.saldo_credito.findOne({
          where: {
            id_saldo_credito: data.id_saldo_credito
          }
        });

        if ((credito.saldo_credito-data.valor_pago) < 0) {
          throw ({message: "El saldo no puede ser negativo", codigo:400});
        }

        const saldo_credito_pago = await con.models.saldo_credito_pago.create(data);
        return saldo_credito_pago;
    }
    catch(error){
        throw {codigo: 500, error: error}
    }
  }

  async findAll() {
    const data = await con.models.saldo_credito_pago.findAll();
    return data;
  }
  async findOne(id) {
    const rta = await con.models.saldo_credito_pago.findByPk(id);
    if (!rta || rta.length == 0) {
      throw ({ message: 'no se encontro pago buscado del credito', codigo: 404})
    }
    return rta;
  }
  
  async findOneByIdCredito(id) {
    const [rta] = await con.models.saldo_credito_pago.findAll(
      { where: { id_saldo_credito: id } }
    );
    if (!rta || rta.length == 0) {
      throw ({ message: 'no se encontro credito', codigo: 404})
    }
    return rta;
  }
}
module.exports = SaldoCreditoService;
