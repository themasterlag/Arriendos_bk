const con = require('../libs/sequelize');

class PermisoService{
    constructor(){

    }

    async create(data){
        const rta = await con.models.permiso.findAll({
            where: {permiso: data.permiso},
    });

    if(rta.length == 0){
        const permiso = await con.models.permiso.create(data)
        return permiso;
    }else{
        throw{message: 'Permiso existente', codigo:404};
    }
    }


    async find(){
        const permiso = await con.models.permiso.findAll({
            order: [
                ['id_permiso', 'ASC']
              ]
        })
        return permiso
    }
    async findOne(id){
        const permiso = await con.models.permiso.findByPk(id)
        return permiso
    }
    async update(id, data){
        // const oldPermiso = await this.findOne(id)
        // try {
        //    const updated =  oldPermiso.update(data)
        //    return updated
        // } catch (error) {
        //     throw Error(error)
        // }
        const permiso = await this.findOne(id)
        const rta = await permiso.update(data)
        return rta
    }

    async delete(id){
        try{
        const permiso = await this.findOne(id);
        await permiso.destroy();
        return 'eliminado';

        }catch (error) {
        if (error) {
          throw { 
              message: 
              'No se puede eliminar el permiso porque esta siendo utilizado.'
              , codigo: 404 };
        } else {
          throw error;
        }
      }
    }
}
    
module.exports = PermisoService