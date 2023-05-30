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
        id_pago_arriendo: id,
      },
      include: [
        {
          association: 'id_concepto_concepto',
        },
      ],
    });
    return results;
  }

  async updatePagoConceptoValor(pagoConceptoData) {
    let pagoConcepto = await con.models.pago_concepto.findOne({
      where: {
        id_pago_arriendo: pagoConceptoData.id_pago_arriendo,
        id_concepto: pagoConceptoData.id_concepto,
      },
    });

    if (!pagoConcepto) {
      throw new Error('Pago Concepto no encontrado');
    }

    pagoConcepto.pago_concepto_valor = pagoConceptoData.newValor;
    await pagoConcepto.save();

    return pagoConcepto;
  }
}

module.exports = PagoConceptoService;
