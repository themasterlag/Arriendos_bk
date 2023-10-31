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
    const rta = await User.findOne({
      where: {email:emaill, estado:1},
      include: [
        {
          model: con.models.cargo,
          as: 'usuariocargo',
          attributes: ["cargo"],
          include: [
            {
              model: con.models.permiso_detalle,
              as: 'permisodetalle',
              attributes: ["id_permiso"]
            }
          ]
        }
      ]
    });
    if(!rta){
      throw { message: "Usuario no encontrado o inhabilitado" }
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
      apellidos: rta.apellidos,
      permisos: rta.usuariocargo
      }, config.tokSecret, {
      expiresIn: 3600 // 1 hora
    });


    return {token: token};

    //return { id };
  }

  async renovarToken(token){
    try {
      const decode = jwt.verify(token, config.tokSecret);
      delete decode.iat;
      delete decode.exp;
      const newToken = jwt.sign(decode, config.tokSecret, {expiresIn: 3600});

      return {token: newToken};
    } catch (error) {
      throw error;
    }
  }
}


module.exports =  AutService;
