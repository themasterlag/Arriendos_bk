const con = require('../libs/sequelize')
const {config} = require("../config/config");
const User = con.models.usuario;

//const Role = con.models.rol;

//const Op = con.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class AutService{

  constructor(){}

  async registro(data) {
    const usuario = await con.models.usuario.create({
        rolid_rol: data.rolid_rol,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        password: bcrypt.hashSync(data.password, 8),
        dependencia: null,
        tipo_documento: data.tipo_documento,
        proceso: data.proceso,
        subproceso: data.subproceso,
        numero_documento: data.numero_documento,
        sexo: data.sexo,
        estado: 0,
        id_cargo: data.id_cargo
      });
    return usuario;
  }


  async login(emaill,pass) {

    //const client = await con();
    const rta = await User.findOne({where: {email:emaill}});
    if(!rta){
      throw { message: "User Not found." }
    }
    var passwordIsValid = bcrypt.compareSync(
      pass,
      rta.password
    );
    if (!passwordIsValid) {
      throw {
        accessToken: null,
        message: "Invalid Password!"
      };
    }

    var token = jwt.sign({
      id_usuario: rta.id_usuario,
      rolid_rol: rta.rolid_rol,
      nombres: rta.nombres,
      apellidos: rta.apellidos
      }, config.tokSecret, {
      expiresIn: 3600 // 1 hora
    });


    return {token: token};

    //return { id };
  }

}


module.exports =  AutService;
