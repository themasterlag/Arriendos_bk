const con = require('../libs/sequelize');
const subproceso = require('../models/subproceso');

class SubprocesoService{

    constructor(){
    }
    async find (){
        const data = await con.models.subproceso.findAll({
            order: [
              ['id_subproceso', 'ASC']
            ]
          });
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

        const rta = await con.models.subproceso.findAll({
            where: {subproceso: data.subproceso},
        });

        if(rta.length == 0){
            const subproceso = await con.models.subproceso.create(data);
            return subproceso;
        } else {
            throw {message: 'Subproceso existente', codigo:404};
        }
    }

       async update(id, data){
        const subproceso = await this.findById(id)
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