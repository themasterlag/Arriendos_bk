const Joi = require('joi');

const contratoSchema = Joi.object({

  valor_canon: Joi.number().required(),

	duracion_contrato: Joi.string().alphanum().required(),

	incremento_anual: Joi.number().required(),

	incremento_adicional: Joi.number().required(),

	fecha_inicio_contrato: Joi.date().required(),

	fecha_fin_contrato: Joi.date().required(),

	subsidio_internet: Joi.string().alphanum().required(),

	subsidio_agua: Joi.string().alphanum().required(),

	subsidio_energia: Joi.string().alphanum().required(),

	tipo_contrato: Joi.number().required(),

	codigo_factura_internet: Joi.string().alphanum().required(),

	codigo_factura_agua: Joi.string().alphanum().required(),

	codigo_factura_energia: Joi.string().alphanum().required(),

	valor_administracion: Joi.number().required(),

	prorroga: Joi.string().alphanum().required(),

	metodo_pago: Joi.number().required(),

	entidad_bancaria: Joi.number().required(),

	tipo_cuenta: Joi.string().alphanum().required(),

	numero_cuenta: Joi.string().alphanum().required(),

	definicion: Joi.string().alphanum().required(),

  poliza: Joi.boolean().required()


})

module.exports = contratoSchema;
