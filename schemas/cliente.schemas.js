const Joi = require('joi');

const clienteSchema = Joi.object({

  nombres: Joi.string().alphanum().required(),

  apellidos: Joi.string().alphanum(),

  genero: Joi.string().alphanum().required(),

  numero_documento: Joi.string().alphanum().required(),

  direccion: Joi.string().alphanum().required(),

  numero_contacto: Joi.number().required(),

  numero_contacto2: Joi.number().required(),

  fecha_nacimiento: Joi.date().required(),

  email: Joi.string().email().required(),

  id_municipio: Joi.number(),
  tipo_documento: Joi.string().alphanum() .required(),
  razon_social: Joi.string().alphanum(),
  digito_verificacion: Joi.string().alphanum()
})
module.exports = clienteSchema;
