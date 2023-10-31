const express = require('express');

const router = express.Router();

const NovedadesService = require('./../services/novedades.service');
const novedadesService = new NovedadesService()


router.get('/', async (req, res, next)=>{
    try {
        const novedades = await novedadesService.find()
        res.json(novedades).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
 })

 

 router.post('/', async(req, res, next)=>{
    try {
        let file = req.files.firma;
        console.log(file.data); // la columna firma_vinculado = file.data
        const novedad = req.body
        const newNovedad = await novedadesService.create(novedad,file.data)
        res.json(newNovedad).status(200)
    } catch (error) {
        if(error.codigo){
            res.status(error.codigo).send(error)

        }else{
            res.status(error).send(error)

        }
        

    }
})

 router.get('/:id', async( req, res, next)=>{
    try {
        const { id } = req.params
        const novedad = await novedadesService.findOne(id)
        res.json(novedad).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
 })

 router.patch('/update', async(req, res, next)=>{
    try {
        const oldNovedad = req.body
        const idNovedad = oldNovedad.id_novedad
        console.log(idNovedad)
        const updated = await novedadesService.update(idNovedad, oldNovedad)
        // console.log(idNovedad, oldNovedad.novedad)
        res.json(updated).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.delete('/:id', async(req, res, next)=>{
    try {
        const { id } = req.params
        console.log(id , "--------------------------")
        const deleted = await novedadesService.delete(id)
        res.json(deleted).status(200)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

 module.exports = router