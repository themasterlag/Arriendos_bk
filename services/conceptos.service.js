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
    console.log(data)
    const concepto = await con.models.conceptos.create(data);
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
          throw {message: 'no se encontro', codigo:404};
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
        // include: [
        //   {
        //     model: con.models.propietario_punto_venta,
        //     as: 'proppv',
        //     include: [
        //       {
        //         model: con.models.cliente,
        //         as: 'propcliente',
        //       },
        //     ],
        //   },
        // ],
      });
      if (!rta || rta.length == 0) {
        throw {message: 'No se encontro', codigo:404};    }
      return rta;
    }

    async update(id, changes) {
      const concepto =  await this.findByCodigoConcepto(id);      
      // if (!changes.password) {
      //   changes.password = usuario.password;
      // }
      // else{
      //   changes.password = bcrypt.hashSync( changes.password.toString(), 8);
      // }  
      const rta = await concepto.update(changes);
  
      return rta;
    }
}


  module.exports= ConceptosService;