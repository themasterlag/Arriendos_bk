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

  async findOneCodigoSitioVenta(codigo_sitio_venta) {
    console.log('Valor de codigo_sitio_venta:', codigo_sitio_venta); 
  
    const puntoVenta = await con.models.punto_de_venta.findOne({
      where: {
        codigo_sitio_venta: codigo_sitio_venta,
      },
    });
  
    if (!puntoVenta) {
      throw { message: 'Punto de venta no encontrado', codigo: 404 };
    }
  
    return puntoVenta;
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
 
  

  async inhabilitarPuntoDeVenta(codigo_sitio_venta, fecha_inactivo, razon_inactivo) {
    try {
      // Busca el punto de venta por código de sitio de venta
      const puntoDeVenta = await this.findOneCodigoSitioVenta(codigo_sitio_venta);
  
      // Actualiza los datos de inhabilitación
      await puntoDeVenta.update({
        fecha_inactivo: fecha_inactivo,
        razon_inactivo: razon_inactivo,
      });
  
      return puntoDeVenta.codigo_sitio_venta; 
    } catch (error) {
      throw error; // Deja que el controlador maneje el error
    }
  }

  
  

  async habilitarPuntoDeVenta(codigo_sitio_venta) {
    try {
      // Busca el punto de venta por código de sitio de venta
      const puntoDeVenta = await this.findOneCodigoSitioVenta(codigo_sitio_venta);
  
      // Verifica si el punto de venta ya está habilitado
      // if (!puntoDeVenta.inhabilitado) {
      //   throw new Error('El punto de venta ya está habilitado.'); 
      // }
  
      // Actualiza el estado de inhabilitación a false
      await puntoDeVenta.update({
        fecha_inactivo: null, 
        razon_inactivo: null, 
      });
  
      return puntoDeVenta.codigo_sitio_venta;
    } catch (error) {
      throw error; // Deja que el controlador maneje el error
    }
  }
  
}
module.exports = PuntoDeVentaService;
