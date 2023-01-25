const Joi = require('joi');

const arrendadorSchema = Joi.object({

  nombres: Joi.string().alphanum().required(),

  apellidos: Joi.string().alphanum(),

  genero: Joi.string().alphanum().required(),

  tipo_persona: Joi.string().alphanum().required(),

  tipo_documento: Joi.string().alphanum().required(),

  numero_documento: Joi.string().alphanum().required(),

  direccion: Joi.string().alphanum().required(),

  numero_contacto: Joi.number().required(),

  numero_contacto2: Joi.number().required(),

  fecha_nacimiento: Joi.date().required(),

  email: Joi.string().email().required()

})

module.exports = arrendadorSchema;
