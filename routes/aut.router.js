const express = require('express');

const router = express.Router();
const autJwtService = require('./../services/autJwt.service');
const veriReg = require('../middlewares/veriRegJwt');
const errorHandler = require('../middlewares/error.handler');
//const validatorHandler = require('./../middlewares/validator.handler');
//const {updateUserSchema, createUserSchema, getUserSchema} = require('./../services/usuario.service')

const service = new autJwtService();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup", async (req, res, next) => {
  try {
    let verify = await veriReg.checkDuplicateUsernameOrEmail(req, res, next)
    if ( verify.statusCode==200) {
      verify = await service.registro(req.body);
      if (verify) {
        verify = {statusCode: 200, message :"Usuario registrado con exito"};
      }
    }
    res.json(verify);

  } catch (error) {
    errorHandler.errorHandler(error, req, res, next)
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const users = await service.login(email, pass);
    res.json(users);
  } catch (error) {
    errorHandler.errorHandler(error, req, res, next)
  }
});

module.exports = router;
