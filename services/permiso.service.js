const con = require('../libs/sequelize');

class PermisoService{
    constructor(){

    }
    async create(data){
        const newPermiso = await con.models.permiso.create(data)
        return newPermiso
    }
    async find(){
        const permiso = await con.models.permiso.findAll()
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
        console.log(permiso)
        const rta = await permiso.update(data)
        return rta
    }
    async delete(id){
        const permiso = await this.findOne(id)
        permiso.destroy()
        return 'eliminado'
    }
}
module.exports = PermisoService