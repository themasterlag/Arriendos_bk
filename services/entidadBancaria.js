const con = require('../libs/sequelize');

class EntidadBancariaService{

  constructor(){

  }

  async create(data) {
    const { entidad_bancaria } = data;

    // Verificar si ya existe una entidad bancaria con el mismo nombre
    const existingEntity = await con.models.entidad_bancaria.findOne({
      where: { entidad_bancaria },
    });

    if (existingEntity) {
      // throw new Error('Banco existente');
      throw{message: 'Exte banco ya esta registrado', codigo:404};
    }

    // Si no existe, crear la entidad bancaria
    const nuevaEntidadBancaria = await con.models.entidad_bancaria.create(data);
    return nuevaEntidadBancaria;
  }

  async find(){
    const data = await con.models.entidad_bancaria.findAll()
    return data;
    }

    async findById(id) {
      const banco = await con.models.entidad_bancaria.findOne({
        where: { id_entidad_bancaria: id },
        include: [
          {
            model: con.models.permiso_detalle,
            as: 'permisodetalle',
            include: [
              {
                model: con.models.permiso,
                as: 'permiso'
              }
            ]
          }
        ],
      });
      return banco;
    }
  


async findOneBanco(id){
  try {
    // Realiza la consulta para buscar la entidad bancaria por su ID
    const rta = await con.models.entidad_bancaria.findByPk(id);
    return rta;
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw error;
  }
}



    
  
    async update(id, data){
      const entidad_bancaria = await this.findOneBanco(id)
      const rta = await entidad_bancaria.update(data)
      return rta
  }
  
  async delete(id){
    const entidad_bancaria = await this.findOneBanco(id)
    await entidad_bancaria.destroy()
    return 'eliminado'
  }
  
 


  async modify(id, nuevoNombre) {
    try {
      // Primero, verifica si la entidad bancaria existe
      const entidadBancaria = await this.findOneBanco(id);
  
      if (entidadBancaria) {
        console.log(`Entidad bancaria encontrada. ID: ${id}`);
        console.log(`Nuevo nombre: ${nuevoNombre}`);
  
        // Actualiza el nombre de la entidad bancaria con el nuevo nombre proporcionado
        const updatedEntity = await entidadBancaria.update({ entidad_bancaria: nuevoNombre });
  
        console.log(`Entidad bancaria actualizada. ID: ${id}`);
        console.log(`Nuevo nombre actualizado: ${updatedEntity.entidad_bancaria}`);
  
        // Borra el contenido del campo de texto después de la modificación exitosa
        return updatedEntity;
      } else {
        console.error('Entidad bancaria no encontrada');
        throw new Error('Entidad bancaria no encontrada');
      }
    } catch (error) {
      console.error("Error en la modificación:", error);
      throw error;
    }
  }
  
  

  

  }
module.exports = EntidadBancariaService;
