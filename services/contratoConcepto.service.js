const con = require('../libs/sequelize');

class ContratoConceptoService {
  constructor() {}

  async create(data) {
    const contrato = await con.models.contrato_conceptos.create(data);
    console.log(contrato.id_contrato_concepto);
    return contrato.id_contrato_concepto;
  }
  async find() {
    const data = await con.models.contrato_conceptos.findAll();
    return data;
  }

  async findOne(id) {
    const rta = await con.models.contrato_conceptos.findByPk(id);
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
  async findByContrato(id) {
    console.log(id);
    const data = await con.models.contrato_conceptos.findAll({
      where: {
        id_contrato: id,
      },
      include: [
        {
          association: 'id_concepto_concepto',
        },
      ],
    });
    return data;
  }
  async delete(id) {
    const contrato = await this.findOne(id);
    await contrato.destroy();
    return 'eliminado';
  }

  async updateValorConcepto(id, valor) {
    const contratoConcepto = await this.findOne(id);
    const rta = await contratoConcepto.update({ valor });
    return rta;
  }
}
module.exports = ContratoConceptoService;
