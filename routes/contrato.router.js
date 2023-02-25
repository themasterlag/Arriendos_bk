const express = require('express');


const router = express.Router();

const ContratoService = require('./../services/contrato.service');

const service = new ContratoService();

const ContratoConcepto = require('./../services/contratoConcepto.service');
const contratoConceptoService = new ContratoConcepto();

function registrarConceptos(conceptos) {
  conceptos.forEach(concepto => {
    let contratoConcepto = contratoConceptoService.create(
      {id_contrato: newContrato, id_concepto: concepto}
    )
    
    if (!contratoConcepto) {
      bandera = false;
    }
  });
}

router.get('/', async(req,res,next)=>{
  try {
    const contrato = await service.find();
    res.json(contrato);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const contratos = await service.findOne(id);
    console.log(contratos);
    res.json(contratos)
  } catch (error) {
    next(error)
  }
})

router.get('/pdv/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const contratos = await service.findOnePdv(id);
    console.log(contratos);
    res.json(contratos)
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    let conceptos = body.conceptos.split(",");
    const contrato = JSON.parse(body.contrato)
      // para crear un contrato necesito:
      // id pdv, id_usuario(puede ser null),
    const newContrato = await service.create(contrato);

    let bandera = true;

<<<<<<< Updated upstream
    if (newContrato) {
      if(!registrarConceptos(conceptos)){
=======
    conceptos.forEach(concepto => {
      let contratoConcepto = contratoConceptoService.create(
        {id_contrato: newContrato, id_concepto: concepto}
      )

      if (!contratoConcepto) {
>>>>>>> Stashed changes
        bandera = false;
      }
    }
    else{
      bandera = false;
    }

    if (bandera) {
      res.status(201).json({
        estado:'1',
        id:newContrato,
        respuesta: 'se agrego correctamente el contrato'});
    }
    else{
      next("No se registraron los conceptos")
    }
  } catch (error) {
    next(error)
  }
})
router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const contrato = await service.delete(id);
  res.status(201).json(contrato);
  } catch (error) {
    next(error)
  }
})

router.patch('/', async(req, res, next)=>{
  try {
    const body = req.body
    let conceptos = body.conceptos.split(",");
    const contrato = JSON.parse(body.contrato);
    const newContrato = await service.update(contrato);

    let bandera = true;

    if (newContrato) {
      if(!registrarConceptos(conceptos)){
        bandera = false;
      }
    }
    else{
      bandera = false;
    }

    if (bandera) {
      res.status(201).json({
        estado:'1',
        id:newContrato,
        respuesta: 'se actualizo correctamente el contrato'});
    }
    else{
      next("No se registraron los conceptos")
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
