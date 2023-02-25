const con = require('../libs/sequelize');

class ContratoService {
  constructor() {}

  async create(data) {
    const contrato = await con.models.contrato.create(data);
    return contrato.id_contrato;
  }

  async find() {
    const data = await con.models.contrato.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.contrato.findByPk(id);
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }

  async findOnePdv(id) {
    const rta = await con.models.contrato.findOne({
      where: {
        id_punto_venta: id,
      },
      include: [
        {
          association: 'id_responsable_responsable',
          as: 'responsable',
        },
        {
          association: 'id_autorizado_autorizado',
        },
      ],
    });
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {
    const contrato = await this.findOne(id);

    const rta = await contrato.update(changes);

    return rta;
  }

  async delete(id) {
    const contrato = await this.findOne(id);
    await contrato.destroy();
    return 'eliminado';
  }
}
module.exports = ContratoService;
