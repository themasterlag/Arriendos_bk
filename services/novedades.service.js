const con = require('../libs/sequelize');

class novedadesService{

  constructor(){

  }

  async find(){
    const data = con.models.novedades.findAll();
    return data;
  }  

  async findOne(id){
    const rta = await con.models.novedades.findByPk(id);
    if(!rta){
      throw {message: 'no se encontro', codigo:404};
    }
    return rta;
  }

  async create(datos, fileData) {
    
  // console.log("-*-*--*-*-*-*-*-*-*-*--*-",fileData,"---------------------",datos);
  datos.firma_vinculado = fileData;
  console.log(datos.Novedad)
   const rta = await con.models.novedades.create(datos);
    return true; 
}


  async update(id, data){
    const novedad = await this.findOne(id)
    console.log(novedad)
    const rta = await novedad.update(data)
    return rta
}

  async delete(id) {
    try {
      const novedad = await this.findOne(id);
      await novedad.destroy();
      return 'Eliminado';

    } catch (error) {
      if (error) {
        throw { 
            message: 
            'No se puede eliminar el cargo debido a su uso por un usuario o a los permisos asociados. Se recomienda quitar los permisos y el cargo al usuario que lo está utilizando.'
            , codigo: 404 };
      } else {
        throw error;
      }
    }
  }

}
module.exports = novedadesService;
