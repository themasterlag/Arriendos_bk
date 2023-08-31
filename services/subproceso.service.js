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

    async create(data){
        const subproceso = await con.models.subproceso.create(data);
        return subproceso;
       }

       async update(id, data){
        const subproceso = await this.findById(id)
        console.log(subproceso)
        const rta = await subproceso.update(data)
        return rta
      }
    
      async delete(id){
        const subproceso = await this.findById(id)
        await subproceso.destroy()
        return 'eliminado'
      }

}
module.exports = SubprocesoService