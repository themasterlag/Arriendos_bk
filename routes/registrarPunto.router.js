const express = require('express');
const RegistroService = require('./../services/registrarpunto.service');
const router = express.Router();

const service = new RegistroService();

router.post('/', async(req,res,next)=>{
  try {
    const superjson = req.body;
    service.registrarFormulario(superjson)
    res.status(200).json({
      codigo:1,
      info: "registrado"
    })
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
