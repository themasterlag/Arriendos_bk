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


 
 router.post('/', async (req, res, next) => {
   try {
    if(!req.files){
      throw ({message: 'Puto', codigo: 400});
     }

     let file = req.files.Imagen;
     console.log(file.data, '-----------------------------------------'); // la columna firma_vinculado = file.data
 
     
     // Realiza JSON.parse en la cadena JSON de req.body.Novedad
     const novedadString = req.body.Novedad;
     let Novedad;
     
     try {
       Novedad = JSON.parse(novedadString);
     } catch (error) {
       console.error('Error al analizar la cadena JSON:', error);
       res.status(400).send('La cadena JSON en Novedad no es válida');
       return;
     }
 
     console.log(Novedad, "-----------------------");
     const newNovedad = await novedadesService.create(Novedad, file.data);
     res.status(200).json(newNovedad);
   } catch (error) {
    console.error(error);
     if (error.codigo) {
       res.status(error.codigo).send(error);
     } else {
       res.status(500).send(error);
     }
   }
 });
 
 

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