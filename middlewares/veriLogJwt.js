const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
const con = require('../libs/sequelize');
const User = con.models.usuario;



var verifyToken = (req, res) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.tokSecret,  (err) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        status: 0
      });
    }
  });

  return res.statusCode;
};

var verifyRol = (req, res, key)=>
{
  let token = req.headers["x-access-token"];
  jwt.verify(token, key,  (err) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  });
  return res.statusCode;
}

var isAdmin =   async (req, res) => {
  let token = req.headers["x-access-token"];
  let usuario=   await User.findOne({where: {rolid_rol: 1, id_usuario: jwt.decode(token).id_usuario}});
  if (usuario) {
      return res.status(200);
    }
    return res.status(403).send({
      message: "Require Admin Role!"
    });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  verifyRol: verifyRol
  /*isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin*/
};
module.exports = authJwt;
