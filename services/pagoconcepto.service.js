const con = require('../libs/sequelize');
// eslint-disable-next-line no-unused-vars
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
          association: 'conceptodetalle',
        },
      ],
    });
    return results;
  }
  async findByPagoArriendoAndConcepto(pago_arriendo, concepto){
      const result = await con.models.pago_concepto.findOne({
        where:{
          id_pago_arriendo: pago_arriendo,
          id_concepto: concepto,
        }
      })
      return result;
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

    pagoConcepto.pago_concepto_valor = pagoConceptoData.valor;
    await pagoConcepto.save();

    return pagoConcepto;
  }
}

module.exports = PagoConceptoService;
