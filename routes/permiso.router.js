const express = require('express');

const router = express.Router();

const PermisoService = require('./../services/permiso.service')
 const permisoService = new PermisoService()

 router.get('/', async (req, res, next)=>{
    try {
        const permisos = await permisoService.find()
        res.json(permisos).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
 })

 router.post('/', async (req, res, next)=>{
    try {
        const data = req.body
        const newPermiso = await permisoService.create(data)
        // res.json({
        //     estado : '1',
        //      id: newPermiso.id_permiso,
        //     respuesta: 'Se agrego correctamente el permiso'
        // }).status(200)
        res.json({
            permiso: newPermiso,
            respuesta: "Se agrego correctamente"
        }).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
 })

 router.get('/:id', async( req, res, next)=>{
    try {
        const { id } = req.params
        const permiso = await permisoService.findOne(id)
        res.json(permiso).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
 })

router.patch('/update', async (req, res, next)=>{
    try {
        const newPermiso = req.body
        const updatePermiso = await permisoService.update(newPermiso.id_permiso, newPermiso)
        // res.json({
        //     estado : '1',
        //      id: updatePermiso.id_permiso,
        //     respuesta: 'Se agrego correctamente el permiso'
        // })
        res.json({
            permiso: updatePermiso,
            respuesta: "Se agrego correctamente"
        }).status(200)
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        }
        else{
            res.status(500).send(error);
        }
    }
})

router.delete('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const message = await permisoService.delete(id)
        res.json({
            estado : '1',
            respuesta: message
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

 module.exports = router