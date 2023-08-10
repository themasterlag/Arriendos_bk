const express = require('express');

const router = express.Router();

const PermisoDetalleService = require('./../services/moduloPermisosDetalle.service')

const permisoDetalleService = new PermisoDetalleService()

router.get('/', async (req, res, next)=>{
    try {
        const permisoDetalles = await permisoDetalleService.findPermisoDetalle()
        res.json(permisoDetalles)
    } catch (error) {
        next(error)
    }
})

router.post('/',async (req, res, next)=>{
    try {
        const newPermisoDetalle = req.body
        let permisoDetalle = null;
        
        if (newPermisoDetalle.check) {
            permisoDetalle = await permisoDetalleService.createPermisoDetalle(newPermisoDetalle);
        }
        else{
            permisoDetalle = await permisoDetalleService.deletePermisoDetalle(newPermisoDetalle);
        }
     res.json(createPermisoDetalle).status(200)
    } catch (error) {
        res.json(error).status(500)
    }
})
router.patch('/update/', async (req, res, next)=>{
    try {
        const permisoUpdate = req.body
        const id = permisoUpdate.id_permiso_detalle
        const updated = await permisoDetalleService.updatePermisoDetalle(id, permisoUpdate)
        res.status(201).json(updated);
    } catch (error) {
        next(error)
    }
})
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const permisoDelete = await permisoDetalleService.deletePermisoDetalle(id)
        res.status(201).json(permisoDelete);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const permisoDetalle = await permisoDetalleService.finOnePermisoDetalle(id)
        res.json(permisoDetalle).status(200)
    } catch (error) {
        next(error)
    }
})

module.exports = router