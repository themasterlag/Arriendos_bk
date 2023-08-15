const express = require('express');

const router = express.Router();

const ProcesoService = require('./../services/proceso.service')
const SubprocesoService = require('./../services/subproceso.service')
const procesoService = new ProcesoService()
const subprocesoService = new SubprocesoService()

router.get('/', async (req, res, next)=>{
    try {
        const procesos = await procesoService.find()
        res.json(procesos).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.get('/subprocesos/', async (req, res, next)=>{
    try {
        const subprocesos = await subprocesoService.find()
        res.json(subprocesos).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.get('/subprocesos/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const subprocesos = await subprocesoService.findById(id)
        res.json(subprocesos).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.get('/subprocesos-proceso/:procesoid', async (req, res, next)=>{
    try {
        const { procesoid } = req.params
        const subprocesos = await subprocesoService.findByProceso(procesoid)
        res.json(subprocesos).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const procesos = await procesoService.findOnde(id)
        res.json(procesos).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

module.exports = router;
