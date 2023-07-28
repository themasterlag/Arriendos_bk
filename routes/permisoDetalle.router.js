const express = require('express');

const router = express.Router();

const PermisoDetalleService = require('./../services/moduloPermisosDetalle.service')

const permisoDetalleService = new PermisoDetalleService()

router.get('/permiso-detalle', async (req, res, next)=>{
    try {
        const permisoDetalles = await permisoDetalleService.findPermisoDetalle()
        res.json(permisoDetalles)
    } catch (error) {
        next(error)
    }
})

router.post('/permiso-detalle',async (req, res, next)=>{
    try {
        const newPermisoDetalle = req.body
        const createPermisoDetalle = await permisoDetalleService.createPermisoDetalle(newPermisoDetalle)
     res.json(createPermisoDetalle).status(200)
    } catch (error) {
        next(error)
    }
})
router.patch('/permiso-detalle/update/', async (req, res, next)=>{
    try {
        const permisoUpdate = req.body
        const id = permisoUpdate.id_permiso_detalle
        const updated = await permisoDetalleService.updatePermisoDetalle(id, permisoUpdate)
        res.status(201).json(updated);
    } catch (error) {
        next(error)
    }
})
router.delete('/permiso-detalle/delete/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const permisoDelete = await permisoDetalleService.deletePermisoDetalle(id)
        res.status(201).json(permisoDelete);
    } catch (error) {
        next(error)
    }
})

router.get('/permiso-detalle/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const permisoDetalle = await permisoDetalleService.finOnePermisoDetalle(id)
        res.json(permisoDetalle).status(200)
    } catch (error) {
        next(error)
    }
})

module.exports = router