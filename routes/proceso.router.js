const express = require('express');

const router = express.Router();

const ProcesoService = require('./../services/proceso.service');

const service = new ProcesoService();


router.get('/', async(req,res,next)=>{
  try {
    const proceso = await service.find();
    res.json(proceso);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req,res,next)=>{
  try {
    const {id} = req.params;
    const proceso = await service.findOne(id);
    console.log(proceso);
    res.json(proceso);
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
