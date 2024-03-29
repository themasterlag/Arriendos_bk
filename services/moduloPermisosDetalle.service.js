const con = require('../libs/sequelize');

class ModuloPermisoDetalleService{
    constructor(){

    }
    async createPermisoDetalle(data){
        const newPermisoDetalle = await con.models.permiso_detalle.create(data)
        return newPermisoDetalle.id_permiso_detalle
    }
    async findPermisoDetalle(){
        const permisoDetalles = await con.models.permiso_detalle.findAll()
        return permisoDetalles
    }
    async finOnePermisoDetalle(id){
        const permisoDetalle = await con.models.permiso_detalle.findByPk(id)
        return permisoDetalle 
    }
    async updatePermisoDetalle(id, data){
        const oldPermisoDetalle = await this.finOnePermisoDetalle(id)
        try {
            const updated = oldPermisoDetalle.update(data)
            return updated
        } catch (error) {
            throw new Error(error)
        }
    }
    async deletePermisoDetalle(permiso){
        const permisoDetalle = await con.models.permiso_detalle.findOne({
            where:{
                id_permiso: permiso.id_permiso, 
                id_cargo: permiso.id_cargo
            }
        });
        
        permisoDetalle.destroy();
        return 'eliminado'
    }

}
module.exports = ModuloPermisoDetalleService