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
      throw console.error('no se encontro');
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

    const rta = await usuario.update(changes);

    return rta;
  }

  async delete(id) {
    const usuario =  await this.findOne(id);
    await usuario.destroy()
    return 'eliminado'
  }
}

module.exports = UsuarioService;
