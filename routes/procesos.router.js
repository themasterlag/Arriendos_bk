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

// router.get('/subprocesos-proceso/:procesoid', async (req, res, next)=>{
//     try {
//         const { procesoid } = req.params
//         const subprocesos = await subprocesoService.findByProceso(procesoid)
//         res.json(subprocesos).status(200)
//     } catch (error) {
//         res.status(error.codigo).send(error)
//     }
// })

router.post('/subP', async(req, res, next)=>{
    try {
        const subprocesos = req.body
        const newSubProceso = await subprocesoService.create(subprocesos)
        res.json(newSubProceso).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.patch('/updateSub', async(req, res, next)=>{
    try {
        const oldSubProceso = req.body
        const idSubProceso = oldSubProceso.id_subproceso
        console.log(req.body)
        const updated = await subprocesoService.update(idSubProceso, oldSubProceso)
        //  console.log(idSubProceso, oldSubProceso.subproceso)
        res.json(updated).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.delete('/subproceso/:id', async(req, res, next)=>{
    try {
        const { id } = req.params
        console.log(id)
        const deleted = await subprocesoService.delete(id)
        res.json(deleted).status(200)
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

router.post('/p', async(req, res, next)=>{
    try {
        const proceso = req.body
        const newProceso = await procesoService.create(proceso)
        res.json(newProceso).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.patch('/update', async(req, res, next)=>{
    try {
        const oldProceso = req.body
        const idProceso = oldProceso.id_proceso
        console.log(idProceso)
        const updated = await procesoService.update(idProceso, oldProceso)
        console.log(idProceso, oldProceso.proceso)
        res.json(updated).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.delete('/proceso:id', async(req, res, next)=>{
    try {
        const { id } = req.params
        console.log(id)
        const deleted = await procesoService.delete(id)
        res.json(deleted).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

module.exports = router;
