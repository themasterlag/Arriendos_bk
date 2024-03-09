const express = require('express');

const router = express.Router();

const CargoService = require('./../services/cargos.service')
const cargoService = new CargoService()

router.get('/', async (req, res, next)=>{
    try {
        const cargos = await cargoService.find()
        res.json(cargos).status(200)
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        }
        else{
            res.status(500).send(error);
        }
    }
})

router.post('/', async(req, res, next)=>{
    try {
        const cargo = req.body
        const newCargo = await cargoService.create(cargo)
        res.json(newCargo).status(200)
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        }
        else{
            res.status(500).send(error);
        }
    }
})

router.patch('/update', async(req, res, next)=>{
    try {
        const oldCargo = req.body
        const idCargo = oldCargo.id_cargo
        console.log(idCargo)
        const updated = await cargoService.update(idCargo, oldCargo)
        console.log(idCargo, oldCargo.cargo)
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

router.get('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const cargo = await cargoService.findById(id)
        res.status(200).send(cargo)
    } catch (error) {
        if (error.codigo) {
            res.status(error.codigo).send(error);
        }
        else{
            res.status(500).send(error);
        }
    }
})


router.delete('/:id', async(req, res, next)=>{
    try {
        const { id } = req.params
        console.log(id)
        const deleted = await cargoService.delete(id)
        res.json(deleted).status(200)
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