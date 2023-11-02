const con = require('../libs/sequelize');
const { Op } = require('sequelize');

class motivoNovedadesService{
    constructor(){}

    async create(data) {
        const nombre = data.nombre.toString().trim().toLowerCase();
        const descripcion = data.descripcion.toString().trim().toLowerCase();
    
        // Verificar si ya existe un motivo de novedad con el mismo nombre o descripción
        const existingMotivos = await con.models.motivo_novedades.findAll({
          where: {
            [Op.or]: [
              { nombre: nombre },
              { descripcion: descripcion }
            ]
          }
        });
    
        if (existingMotivos.length > 0) {
          throw { message: 'Motivo de novedad con el mismo nombre o descripción ya existe', codigo: 400 };
        }
    
        // Crear un nuevo motivo de novedad en la base de datos
        const nuevoMotivo = await con.models.motivo_novedades.create(data);
    
        return {
          id_motivo: nuevoMotivo.id_motivo,
          nombre: nuevoMotivo.nombre,
          descripcion: nuevoMotivo.descripcion
        };
      }
    

// async create(data) {
//     const nombre = data.nombre.toString().trim().toLowerCase();
//     const descripcion = data.descripcion.toString().trim().toLowerCase();
  
//     // Verificar si ya existe un motivo de novedad con el mismo nombre
//     const existingMotivos = await con.models.motivo_novedades.findAll({
//       where: {
//         [Op.or]: [
//           { nombre: nombre },
//           { descripcion: descripcion }
//         ]
//       }
//     });
  
//     if (existingMotivos.length > 0) {
//       throw { message: 'Motivo de novedad con el mismo nombre o descripción ya existe', codigo: 400 };
//     }
  
//     // Verificar que el nombre y la descripción del motivo de novedad sean únicos
//     const existingMotivosNombre = await con.models.motivo_novedades.findAll({
//       where: {
//         nombre: nombre
//       }
//     });
  
//     if (existingMotivosNombre.length > 0) {
//       throw { message: 'Ya existe un motivo de novedad con el mismo nombre', codigo: 400 };
//     }
  
//     const existingMotivosDescripcion = await con.models.motivo_novedades.findAll({
//       where: {
//         descripcion: descripcion
//       }
//     });
  
//     if (existingMotivosDescripcion.length > 0) {
//       throw { message: 'Ya existe un motivo de novedad con la misma descripción', codigo: 400 };
//     }
  
//     // Crear un nuevo motivo de novedad en la base de datos
//     const nuevoMotivo = await con.models.motivo_novedades.create(data);
  
//     return nuevoMotivo.id_motivo;
//   }

// async create(data) {
//   const nombre = data.nombre.toString().trim().toLowerCase();
//   const descripcion = data.descripcion.toString().trim().toLowerCase();

//   // Verificar si ya existe un motivo de novedad con el mismo nombre
//   const existingMotivos = await con.models.motivo_novedades.findAll({
//     where: {
//       [Op.or]: [
//         { nombre: nombre },
//         { descripcion: descripcion }
//       ]
//     }
//   });

//   if (existingMotivos.length > 0) {
//     const existingMotivo = existingMotivos[0];
//     return existingMotivo;
//   }

//   // Crear un nuevo motivo de novedad en la base de datos
//   const nuevoMotivo = await con.models.motivo_novedades.create(data);

//   return nuevoMotivo.id_motivo;
// }

// async update(id, data) {
//     const motivoNovedad = await con.models.motivo_novedades.findByPk(id);

//     // Verificar si el motivo de novedad existe
//     if (!motivoNovedad) {
//       throw new Error('Motivo de novedad no encontrado', {
//         code: 404,
//         message: 'El motivo de novedad con el ID especificado no existe'
//       });
//     }

//     // Actualizar el motivo de novedad
//     const updatedMotivoNovedad = await motivoNovedad.update(data);

//     return updatedMotivoNovedad;
//   }

async update(id, data) {
    const motivoNovedad = await con.models.motivo_novedades.findByPk(id);

    // Verificar si el motivo de novedad existe
    if (!motivoNovedad) {
      throw new Error('Motivo de novedad no encontrado', {
        code: 404,
        message: 'El motivo de novedad con el ID especificado no existe'
      });
    }

    // Actualizar el motivo de novedad
    const updatedMotivoNovedad = await motivoNovedad.update({
      nombre: data.nombre,
      descripcion: data.descripcion
    });

    return updatedMotivoNovedad;
  }



  async findAll() {
    const motivosNovedad = await con.models.motivo_novedades.findAll();
    return motivosNovedad;
  }

  async findOne(id) {
    const rta = await con.models.motivo_novedades.findByPk(id);
    if (!rta) {
      throw { message: 'Motivo de novedad no encontrado', codigo: 404 };
    }
    return rta;
  }

  async update(id, data) {
    const motivoNovedad = await con.models.motivo_novedades.findByPk(id);
    if (!motivoNovedad) {
      throw { message: 'Motivo de novedad no encontrado', codigo: 404 };
    }

    const updatedMotivoNovedad = await motivoNovedad.update(data);

    return updatedMotivoNovedad;
  }

  async delete(id) {
    const motivoNovedad = await this.findOne(id);
    await motivoNovedad.destroy();
    return 'eliminado';
  }
}
      
module.exports = motivoNovedadesService;  