const Joi = require('joi');

const solicitudSchema = Joi.object({

  fecha_solicitud: Joi.date().required(),

  nombre_solicitante: Joi.string().alphanum(),

  cargo: Joi.string().alphanum().required(),

  id_proceso: Joi.number().required(),

  encargado: Joi.string().alphanum().required()

})

module.exports = solicitudSchema;
