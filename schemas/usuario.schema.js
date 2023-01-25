const Joi = require('joi');

const usuarioSchema = Joi.object({
  nombres: Joi.string().alphanum().required(),

  apellidos: Joi.string().alphanum(),

  email: Joi.string().email()
})

module.exports = usuarioSchema;
