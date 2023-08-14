const con = require('../libs/sequelize')

class CargoService{
    constructor(){

    }

    async create(data) {
        const cargo = await con.models.cargo.create(data);
        return cargo;
    }
    async find(){
        const cargos = await con.models.cargo.findAll()
        return cargos
    }

    async findById(id) {
        const cargo = await con.models.cargo.findAll({
            where: { id_cargo: id },
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
        })
        return cargo
    }

    async findOneCargo(id){
        const cargo = await con.models.cargo.findByPk(id)
        return cargo
    }
    async update(id, data){
        const cargo = await this.findOneCargo(id)
        console.log(cargo)
        const rta = await cargo.update(data)
        return rta
    }
    async delete(id){
        const cargo = await this.findOneCargo(id)
        await cargo.destroy()
        return 'eliminado'
    }
}
module.exports = CargoService