const express = require('express');

const router = express.Router();

const PropPuntoVentaService = require('../services/propietarioPuntoVenta.service');

const service = new PropPuntoVentaService();


router.get('/', async(req,res,next)=>{
  try {
    const proPDV = await service.find();
    res.json(proPDV);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id} = req.params
    const proPDV = await service.findOne(id);
    console.log(proPDV);
    res.json(proPDV)
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.post('/', async(req,res,next)=>{
  try {
    let body = req.body;
    let propietarios = JSON.parse(body.propietarios);
    let newProPDV = [];
    if (propietarios.length > 0) {
      await service.deleteAllByPdv(body.id_punto_venta);

      for (let i = 0; i < propietarios.length; i++) {
        const propietario = propietarios[i];
        
        nuevo = {};
        nuevo["id_propietario"] = propietario;
        nuevo["id_punto_venta"] = body.id_punto_venta;
        console.log(nuevo);
        newProPDV.push(await service.create(nuevo));
      }
    }
    else{
      throw {message: 'No se agregaron propietarios', codigo:400};
    }

    res.status(201).json(newProPDV)
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

router.post('/delete', async(req,res,next)=>{
  try {
    const {id} = req.body;
  const proPDV = await service.delete(id);
  res.status(201).json(proPDV);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

module.exports = router;
