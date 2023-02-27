const con = require('../libs/sequelize');

class ContratoServicioService {
  constructor() {}

  async create(data) {
    const contrato_service = await con.models.contrato_tipo_servicio.create(
      data
    );
    return contrato_service.id_contrato_servicio;
  }

  async find() {
    const data = await con.models.contrato_tipo_servicio.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.contrato_tipo_servicio.findByPk(id);
    if (!rta) {
      throw console.error('no se encontro');
    }
    return rta;
  }

  async findByContrato(id) {
    const data = await con.models.contrato_tipo_servicio.findAll({
      where: {
        id_contrato: id,
      },
    });
    return data;
  }

  async update(id, changes) {
    const contrato_service = await this.findOne(id);

    const rta = await contrato_service.update(changes);

    return rta;
  }

  async delete(id) {
    const contrato_service = await this.findOne(id);
    await contrato_service.destroy();
    return 'eliminado';
  }
}
module.exports = ContratoServicioService;
