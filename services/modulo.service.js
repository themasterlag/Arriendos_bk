const con = require('../libs/sequelize');

class ModuloService{
    constructor(){

    }
    async create(data){
        const newModulo = await con.models.modulo.create(data)
        return newModulo.id_proceso
    }
    async find (){
        const data = await con.models.modulo.findAll()
        return data
    }
}
module.exports =  ModuloService