const con = require('../libs/sequelize');

class PuntoDeVentaService {
  constructor() {}

  async create(data) {
    const find_PDV = await con.models.punto_de_venta.findAll({
      where: {
        codigo_sitio_venta: data.codigo_sitio_venta,
      }
    })
    console.log(find_PDV)

    if(find_PDV.length > 0){
      throw {message: 'Punto con codigo de venta ya existe', codigo:400};
    }    
    const punto_venta = await con.models.punto_de_venta.create(data);
    return punto_venta.id_punto_venta;
  }

  async find() {
    const data = await con.models.punto_de_venta.findAll({
      order: [
        ['codigo_sitio_venta', 'ASC'],
      ]
    });
    return data;
  }

  async findOne(id) {
    const rta = await con.models.punto_de_venta.findByPk(id);
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

  async findByCodigoSitioVenta(codigo_sitio_venta) {
    const rta = await con.models.punto_de_venta.findOne({
      where: {
        codigo_sitio_venta: codigo_sitio_venta,
      },
      include: [
        {
          model: con.models.propietario_punto_venta,
          as: 'proppv',
          include: [
            {
              model: con.models.cliente,
              as: 'propcliente',
            },
          ],
        },
      ],
    });
    if (!rta || rta.length == 0) {
      throw {message: 'no se encontro', codigo:404};    }
    return rta;
  }

  async update(id, changes) {
    // if (changes.propietario) {
      const puntoDeVenta = await this.findOne(id);
      const rta = await puntoDeVenta.update(changes);

      // let propdv = await con.models.propietario_punto_venta.findOne({
      //   where: {
      //     id_punto_venta: rta.id_punto_venta,
      //   }
      // });
    
      // propdv.update({id_propietario: changes.propietario});
    // }
    // else{
    //   throw {message: "Debe agregar un propietario", codigo:400};
    // }

    return rta;
  }

  async delete(id) {
    const puntoDeVenta = await this.findOne(id);
    await puntoDeVenta.destroy();
    return 'eliminado';
  }

  async findPuntoWithoutContrato() {
    const [result] = await con.query(
      `SELECT * FROM arriendos.punto_de_venta
      WHERE id_punto_venta NOT IN (
        SELECT id_punto_venta FROM arriendos.contrato
      ) ORDER BY nombre_comercial ASC`
    );
    return result;
  }
  async inhabilitarPuntoDeVenta(id, fecha_inactivo, razon_inactivo) {
    console.log('id', id, 'FECHA ', fecha_inactivo, 'Razon: ', razon_inactivo);
    const puntoDeVenta = await this.findOne(id);
    await puntoDeVenta.update({
      fecha_inactivo: fecha_inactivo,
      razon_inactivo: razon_inactivo,
    });
    return puntoDeVenta.id_punto_venta;
  }
}
module.exports = PuntoDeVentaService;
