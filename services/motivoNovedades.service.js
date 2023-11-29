const con = require('../libs/sequelize');
const { Op } = require('sequelize');

class motivoNovedadesService{
    constructor(){}


    async create(data) {
      // console.log(data,"---------------------------");
      const rta = await con.models.motivo_novedades.findAll({
          where: {nombre: data.nombre},
  });
console.log(rta);
  if(rta.length == 0){
      const motivo_novedades = await con.models.motivo_novedades.create(data);
      return motivo_novedades;
  }else{
      throw{message: 'motivo Novedad existente', codigo:404};
  }
  }

  // async create(data) {
  //   const nombre = data.nombre.toString().trim().toLowerCase();
  //   const descripcion = data.descripcion.toString().trim().toLowerCase();
  
  //   // Crear un nuevo motivo de novedad
  //   const nuevoMotivo = await con.models.motivo_novedades.create({
  //     nombre,
  //     descripcion,
  //   });
  
  //   return nuevoMotivo;
  // }
  


  async update(id, data){
    const novedad = await this.findOne(id)
    console.log(novedad)
    const rta = await novedad.update(data)
    return rta
}
// async update(id, data) {
//   // Validar los datos proporcionados por el usuario
//   if (!data.nombre) {
//     throw new Error('El nombre del motivo de novedad es obligatorio');
//   }
//   if (data.descripcion.length > 1000) {
//     throw new Error('La descripción del motivo de novedad debe ser menor que 1000 caracteres');
//   }

//   // Obtener el motivo de novedad con el ID especificado
//   const motivoNovedad = await con.models.motivo_novedades.findByPk(id);

//   // Verificar si el motivo de novedad existe
//   if (!motivoNovedad) {
//     throw new Error('Motivo de novedad no encontrado', {
//       code: 404,
//       message: 'El motivo de novedad con el ID especificado no existe'
//     });
//   }

//   // Actualizar el motivo de novedad
//   const updatedMotivoNovedad = await motivoNovedad.update({
//     nombre: data.nombre,
//     descripcion: data.descripcion
//   });

//   return updatedMotivoNovedad;
// }


  async findAll(){
    const motivosNovedad = await con.models.motivo_novedades.findAll({
      order: [
        ['id_motivo', 'ASC']
      ],
      // include: [
      //   {
      //     model: con.models.tipo_pago_novedades,
      //     as: 'proppv',
      //   },
      // ],
    })
    return motivosNovedad
}

  async findOne(id) {
    const rta = await con.models.motivo_novedades.findByPk(id);
    if (!rta) {
      throw { message: 'Motivo de novedad no encontrado', codigo: 404 };
    }
    return rta;
  }

  

  async delete(id) {
    const motivoNovedad = await this.findOne(id);
    await motivoNovedad.destroy();
    return 'eliminado';
  }

  async delete(id) {
    try {
      const motivoNovedad = await this.findOne(id);
      await motivoNovedad.destroy();
      return 'Eliminado';

    } catch (error) {
      if (error) {
        throw { 
            message: 
            'No se puede eliminar porque ya se esta usando en una novedad.'
            , codigo: 404 };
      } else {
        throw error;
      }
    }
  }
}
      
module.exports = motivoNovedadesService;  