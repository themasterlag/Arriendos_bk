const express = require('express');

const router = express.Router();
const TipoPagoNovedadesService = require('../services/tipoPagoNovedades.service');

const service = new TipoPagoNovedadesService();

router.get('/', async (req, res) => {
    try {
        const tipos = await service.find();
        res.status(200).json(tipos);
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        } else {
            res.status(500).send(error);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await service.findOne(id);
        res.status(200).json(tipo);
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        } else {
            res.status(500).send(error);
        }
    }
});

router.post('/', async (req, res) => {
    try {
        const datos = req.body;
        const tipo = await service.create(datos);
        res.status(201).json(tipo);
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        } else {
            res.status(500).send(error);
        }
    }
});

router.put('/', async (req, res) => {
    try {
        const datos = req.body;
        const tipo = await service.update(datos);
        res.status(200).json(tipo);
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        } else {
            res.status(500).send(error);
        }
    }
});

router.patch('/update', async(req, res, next)=>{
    try {
        const oldTipoPAgo = req.body
        const idTipoPago = oldTipoPAgo.id
        console.log(idTipoPago)
        const updated = await service.update(idTipoPago, oldTipoPAgo)
        res.json(updated).status(200)
    } catch (error) {
        if (error.codigo) {
        res.status(error.codigo).send(error);
      }
      else{
        res.status(500).send(error);
      }
    }
  })

router.put('/cambiarEstado', async (req, res) => {
    try {
        const datos = req.body;
        const tipo = await service.changeEstado(datos.id);
        res.status(200).json(tipo);
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        } else {
            res.status(500).send(error);
        }
    }
});

module.exports = router;
