const Joi = require('joi');

const puntoDeVentaSchema = Joi.object({


  id_municipio: Joi.number().required(),

  codigo_sitio_venta:Joi.number().required(),

  nombre_comercial: Joi.string().alphanum().required(),

  direccion: Joi.string().alphanum().required(),

  area_local: Joi.number().required(),

  coordenadas: Joi.string().alphanum().required(),

  numero_ficha_catastral: Joi.number().required(),

  zona: Joi.number().required(),

  microzona: Joi.number().required(),

  sanitario: Joi.boolean().required(),

  lavamanos: Joi.boolean().required(),

  poceta: Joi.boolean().required(),

  linea_vista: Joi.boolean().required(),

  codigo_glpi: Joi.string().alphanum().required(),

  observacion: Joi.string().alphanum().required()

})

module.exports = puntoDeVentaSchema;
