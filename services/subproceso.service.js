const con = require('../libs/sequelize');

class SubprocesoService{

    constructor(){

    }
    async find (){
        const data = await con.models.subproceso.findAll()
        return data
    }
    async findByProceso(proceso){
        const rta = await con.models.subproceso.findAll({
            where:{
                id_proceso: proceso
            }
        })
        return rta
    }
    async findById(id){
        const rta = await con.models.subproceso.findByPk(id)
        return rta
    }
}
module.exports = SubprocesoService