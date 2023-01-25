const con = require('../libs/sequelize');
const User = con.models.usuario;

var checkDuplicateUsernameOrEmail =   async (req, res) => {
  // Email
  let usuario =  await User.findOne({where: {email: req.body.email}})

    if (usuario) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }
    return res.status(200).send({message :"Usuario Creado con exito"});
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
