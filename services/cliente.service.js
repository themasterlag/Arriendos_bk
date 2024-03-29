const con = require('../libs/sequelize');

class ClienteService {
  constructor() {}
  async create(data) {
    let cliente = null;
    const rta = await con.models.cliente.findAll({
      where: {numero_documento: data.numero_documento},
    });

    if (rta.length == 0) {
      cliente = await con.models.cliente.create(data);
    }
    else {
      throw {message: 'Ya existe un tercero con el numero de documento'}
    }
    
    return cliente.id_cliente;
  }

  async find() {
    const data = await con.models.cliente.findAll({
      order: [
        ['numero_documento', 'ASC']
      ]
    });
    return data;
  }

  async findOne(id) {
    const rta = await con.models.cliente.findByPk(id);
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  async findOneByNumeroDocumento(numero_documento) {
    const rta = await con.models.cliente.findOne({
      where: { numero_documento: numero_documento },
    });
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }
  async update(id, changes) {
    const cliente = await this.findOne(id);

    const rta = await cliente.update(changes);

    return rta;
  }

  async delete(id) {
    const arrendador = await this.findOne(id);
    await arrendador.update({ estado: 0 });
    return 'eliminado';
  }
}
module.exports = ClienteService;
