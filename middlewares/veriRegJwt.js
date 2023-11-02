const con = require('../libs/sequelize');
const User = con.models.usuario;

var checkDuplicateUsernameOrEmail =   async (req, res) => {
  // Email
  let usuario =  await User.findOne({where: {email: req.body.email}})

    if (usuario) {
      throw {
        statusCode: 409,
        message: "Email de usuario ya existe"
      };
    }
    return {statusCode: 200, message :"Email disponible"};
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
