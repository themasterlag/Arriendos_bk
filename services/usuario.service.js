//const boom = require('@hapi/boom');

//const e = require('express')
const con = require('../libs/sequelize')
class UsuarioService {

  constructor(){

  }
  async create(data) {
    const usuario = await con.models.usuario.create(data);
    return usuario;
  }

  async find() {
    const query = 'SELECT * FROM arriendos.usuario';
    const [data] = await con.query(query);
    return data;
  }

  async findOne(id) {

    //const client = await con();
    const rta = await con.models.usuario.findByPk(id);
    if(!rta){
      throw {message:'no se encontro', codigo:404};
    }
    return rta;

    //return { id };
  }

  async findByDocumento(documento){
    const rta = await con.models.usuario.findOne({
      where:{
        numero_documento: documento
      }
    })
    return rta
  }
  async update(id, changes) {

    const usuario =  await this.findOne(id);
    
    if (!changes.password) {
      changes.password = usuario.password;
    }

    const rta = await usuario.update(changes);

    return rta;
  }

  async delete(id) {
    const usuario =  await this.findOne(id);
    await usuario.destroy()
    return 'eliminado'
  }
  async habilitarUsuario(id){
    const usuario = await this.findOne(id)
    usuario.update({ estado: 0 })
    return 'habilitado'
  }
  async inhabilitarUsuario(id){
    const usuario = await this.findOne(id)
    usuario.update({ estado: 1 })
    return 'deshabilitado'
  }
}

module.exports = UsuarioService;
