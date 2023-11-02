const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
const con = require('../libs/sequelize');
const User = con.models.usuario;



function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({
      message: "No se recibio token de sesion"
    });
  }
  try {
    // console.log(token)
    const decoded = jwt.verify(token, config.tokSecret);
    req.user = decoded;
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: "Unauthorized!",
      status: 401
    });
  }
  

  return next();
};



function verifyRol(req, res, key){
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

  async function isAdmin  (req, res) {
  let token = req.headers["x-access-token"];
  let usuario=   await User.findOne({where: {rolid_rol: 1, id_usuario: jwt.decode(token).id_usuario}});
  if (usuario) {
      return res.status(200);
    }
    return res.status(403).send({
      message: "Require Admin Role!"
    });
};

// const authJwt = {
//   verifyToken: verifyToken,
//   isAdmin: isAdmin,
//   verifyRol: verifyRol
//   /*isModerator: isModerator,
//   isModeratorOrAdmin: isModeratorOrAdmin*/
// };

// module.exports = authJwt;
module.exports = verifyToken,verifyRol,isAdmin;
