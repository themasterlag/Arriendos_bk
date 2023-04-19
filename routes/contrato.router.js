const express = require('express');

const router = express.Router();

const ContratoService = require('./../services/contrato.service');

const service = new ContratoService();

const ContratoConcepto = require('./../services/contratoConcepto.service');
const contratoConceptoService = new ContratoConcepto();

const ContratoServicioService = require('./../services/contrato_servicio.service');

const contratoServicioService = new ContratoServicioService();
const ContratoConceptoValorService = require('./../services/contratoConceptoValor.service');
const contratoConceptoValorService = new ContratoConceptoValorService();
function registrarConceptos(newContrato, conceptos) {
  let registrados = true;
  conceptos.forEach((concepto) => {
    let contratoConcepto = contratoConceptoService.create({
      id_contrato: newContrato.id_contrato,
      id_concepto: concepto,
    });
    // Si el valor del concepto se encuentra dentro de los conceptos
    // se registra el valor del concepto y se evalua si se registro
    console.log(contratoConcepto.id_contrato_concepto, 'id_contrato_concepto');
    console.log(conceptos.valor, 'valor');
    let valorconcepto = contratoConceptoValorService.save({
      id_contrato_concepto: contratoConcepto.id_contrato_concepto,
      contrato_concepto_valor: conceptos.valor,
    });
    if (!contratoConcepto && !valorconcepto) {
      registrados = false;
    }
  });
  return registrados;
}

router.get('/', async (req, res, next) => {
  try {
    const contrato = await service.find();
    res.json(contrato);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contratos = await service.findOne(id);
    console.log(contratos);
    res.json(contratos);
  } catch (error) {
    next(error);
  }
});

router.get('/pdv/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let contrato = await service.findOnePdv(id);
    const { id_contrato } = contrato;
    const contratoConcepto = await contratoConceptoService.findByContrato(
      id_contrato
    );
    const contratoServicio = await contratoServicioService.findByContrato(
      id_contrato
    );
    res.json({ contrato, contratoConcepto, contratoServicio });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    let conceptos = body.conceptos.split(',');
    const contrato = JSON.parse(body.contrato);
    const valor = body.valor;
    // para crear un contrato necesito:
    // id pdv, id_usuario(puede ser null),
    let newContrato = await service.create(contrato);

    let bandera = true;

    if (newContrato) {
      if (conceptos != '') {
        if (!registrarConceptos(newContrato, conceptos)) {
          bandera = false;
        }
      }
    } else {
      bandera = false;
    }

    if (bandera) {
      res.status(201).json({
        estado: '1',
        id: newContrato.id_contrato,
        respuesta: 'se agrego correctamente el contrato',
      });
    } else {
      next('No se registraron los conceptos');
    }
  } catch (error) {
    next(error);
  }
});
router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    const contrato = await service.delete(id);
    res.status(201).json(contrato);
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    const body = req.body;
    let conceptos = body.conceptos.split(',');
    const contrato = JSON.parse(body.contrato);
    let oldContrato = await service.findOne(contrato['id_contrato']);
    let newContrato = await oldContrato.update(contrato);
    let bandera = true;

    if (newContrato) {
      if (conceptos != '') {
        if (!registrarConceptos(newContrato, conceptos)) {
          bandera = false;
        }
      }
    } else {
      bandera = false;
    }

    if (bandera) {
      res.status(201).json({
        estado: '1',
        id: newContrato.id_contrato,
        respuesta: 'se actualizo correctamente el contrato',
      });
    } else {
      next('No se registraron los conceptos');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
