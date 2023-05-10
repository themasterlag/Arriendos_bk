const con = require('../libs/sequelize');

class ContratoService {
  constructor() {}

  async create(data) {
    const contrato = await con.models.contrato.create(data);
    return contrato.id_contrato;
  }

  async find() {
    const [data] = await con.query(
      `select * from arriendos.contrato 
        inner join arriendos.punto_de_venta 
          ON punto_de_venta.id_punto_venta = contrato.id_punto_venta
      order by punto_de_venta.codigo_sitio_venta asc`
    );
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
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_autorizado_autorizado',
          include: {
            association: 'id_cliente_cliente',
          },
        },
        {
          association: 'id_punto_venta_punto_de_ventum',
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
  async inhabilitarContrato(id, fecha_inactivo, razon_inactivo) {
    const contrato = await this.findOne(id);
    if (!contrato) {
      throw new Error('Contrato no encontrado');
    }
    const contratoActualizado = await contrato.update({
      fecha_inactivo: fecha_inactivo,
      razon_inactivo: razon_inactivo,
    });
    return contratoActualizado.id_contrato;
  }
}
module.exports = ContratoService;
