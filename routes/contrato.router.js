const express = require('express');

const router = express.Router();

const ContratoService = require('./../services/contrato.service');

const service = new ContratoService();

const ContratoConcepto = require('./../services/contratoConcepto.service');
const contratoConceptoService = new ContratoConcepto();

const ConceptoMunicipioService = require('./../services/conceptoMunicipio.service');
const conceptoMunicipioService = new ConceptoMunicipioService();
function registrarConceptos(newContrato, conceptos) {
  let registrados = true;
  console.log(conceptos, 'conceptos');
  //conceptos = JSON.parse(conceptos);
  conceptos.forEach(async (concepto) => {
    let contratoConcepto = await contratoConceptoService.create({
      id_contrato: newContrato.id_contrato,
      id_concepto: concepto.id_concepto,
      valor: concepto.valor,
    });
    if (!contratoConcepto) {
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
router.get('/concepto-municipio', async (req, res, next) => {
  try {
    const conceptoMunicipio =
      await conceptoMunicipioService.findAllConceptoMunicipio();
    res.json(conceptoMunicipio);
  } catch (error) {
    next(error);
    console.log('Error details:', error.message, error.stack);
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
    res.json({ contrato, contratoConcepto });
  } catch (error) {
    next(error);
    //console.log('Error details:', error.message, error.stack);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    let conceptos = body.conceptos.split(',');
    conceptos = JSON.parse(body.conceptos);
    const contrato = JSON.parse(body.contrato);

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

// Valores predeterminados para el objeto contrato
const defaultContrato = {
  id_contrato: null,
  id_punto_venta: null,
  id_usuario: null,
  valor_canon: null,
  incremento_anual: null,
  incremento_adicional: null,
  fecha_inicio_contrato: null,
  fecha_fin_contrato: null,
  tipo_contrato: null,
  valor_adminstracion: null,
  definicion: null,
  poliza: null,
  id_responsable: null,
  id_autorizado: null,
  id_autorizado_adm: null,
};

router.patch('/', async (req, res, next) => {
  try {
    const body = req.body;
    let conceptos = JSON.parse(body.conceptos);
    const contrato = { ...defaultContrato, ...JSON.parse(body.contrato) };
    console.log('conceptos', conceptos);
    console.log('contrato', contrato);
    let oldContrato = await service.findOne(contrato['id_contrato']);
    let newContrato = null;
    if (oldContrato) {
      newContrato = await oldContrato.update(contrato);
      console.log('Contrato actualizado correctamente:', newContrato);
    } else {
      console.log(
        'No se pudo encontrar el contrato con id ',
        contrato['id_contrato']
      );
    }
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
    console.log('Error details:', error.message, error.stack);
  }
});

module.exports = router;
