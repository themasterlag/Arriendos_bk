//const boom = require('@hapi/boom');

//const e = require('express')
const con = require('../libs/sequelize')
var bcrypt = require("bcryptjs");

class tipoConceptoService {

  constructor(){

  }
  // async create(data) {
  //   const tipo_concepto = await con.models.tipo_concepto.create(data);
  //   return tipo_concepto;
  // }

  async find() {
    const data = await con.models.tipo_concepto.findAll();
    return data;
  }

//   async findOne(id) {

//     //const client = await con();
//     const rta = await con.models.usuario.findByPk(id);
//     if(!rta){
//       throw {message:'No se encontro', codigo:404};
//     }
//     return rta;

//     //return { id };
//   }

//   async findByDocumento(documento){
//     const rta = await con.models.usuario.findOne({
//       where:{
//         numero_documento: documento
//       }
//     });

//     if(!rta){
//       throw {message:'No se encontro el usuario', codigo:404};
//     }

//     return rta
//   }
//   async update(id, changes) {
//     const usuario =  await this.findOne(id);
    
//     if (!changes.password) {
//       changes.password = usuario.password;
//     }
//     else{
//       changes.password = bcrypt.hashSync( changes.password.toString(), 8);
//     }

//     const rta = await usuario.update(changes);

//     return rta;
//   }

//   async delete(id) {
//     const usuario =  await this.findOne(id);
//     await usuario.destroy()
//     return 'eliminado'
//   }
//   async habilitarUsuario(id){
//     const usuario = await this.findOne(id);
//     usuario.update({ estado: 1 });
//     return 'habilitado';
//   }
//   async inhabilitarUsuario(id){
//     const usuario = await this.findOne(id)
//     usuario.update({ estado: 0 });
//     return 'deshabilitado';
//   }
}

module.exports = tipoConceptoService;
