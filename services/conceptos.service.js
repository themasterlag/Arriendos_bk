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

    async create(data) {
      let concepto = null;
      const buscar_concepto = await con.models.conceptos.findAll({
        where: {
          codigo_concepto: data.codigo_concepto
        }
      })

      if (buscar_concepto.length == 0) {
        concepto = await con.models.conceptos.create(data);

      }else {
        throw {message: 'Ya existe un concepto con el codigo ingresado', codigo: 404}
      }
      return concepto;
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
          throw {message: 'No se encontro', codigo:404};
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

    async findByCodigoConcepto(idConcepto){
      const rta = await con.models.conceptos.findOne({
        where: {
          codigo_concepto: idConcepto,
        },
      });
      if (!rta || rta.length == 0) {
        throw {message: 'No se encontro', codigo:404};    }
      return rta;
    }

    async update(id, changes) {
      const concepto =  await this.findByCodigoConcepto(id);      

      const rta = await concepto.update(changes);
  
      return rta;
    }

    async delete(id){
      const buscar = await this.findOne(id);
      console.log(buscar)
      await buscar.destroy();
      return 'Concepto Eliminado'      
    }
}


  module.exports= ConceptosService;