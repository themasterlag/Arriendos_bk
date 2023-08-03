const con = require('../libs/sequelize');

class ConceptosService{
  
    constructor(){

    }
    async find() {
        const data = await con.models.conceptos.findAll({
          order: [
            ['codigo_concepto', 'ASC']
          ]
        })
        return data;
      }

    async findTipo(id){
      const data = await con.models.conceptos.findAll({
        where: {
          tipo_concepto: id
        }
      })
        return data;
    }
    
    async findOne(id) {
    
        const rta = await con.models.conceptos.findByPk(id);
        if(!rta){
          throw console.error('no se encontro');
        }
        return rta;
      }

    async findWhitAsociado(){
      const data = await con.models.conceptos.findAll({
        where: {
          concepto_asociado: {
            [con.Sequelize.Op.ne]: null
          }
        }
      })
        return data;
    }  
}


  module.exports= ConceptosService;