const con = require('../libs/sequelize');
const { Op } = require('sequelize');

class PagoConceptoService {
  constructor() {}

  async findConceptos() {
    const results = await con.models.pago_concepto.findAll();
    return results;
  }

  async findByPago(id) {
    const results = await con.models.pago_concepto.findAll({
      where: {
        id_pago_arriendo: id
      },include: [
        {
          association: 'id_concepto_concepto',
        },
      ],
    });
    return results;
  }
}

module.exports = PagoConceptoService;
