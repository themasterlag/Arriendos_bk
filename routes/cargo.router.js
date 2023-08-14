const express = require('express');

const router = express.Router();

const CargoService = require('./../services/cargos.service')
const cargoService = new CargoService()

router.get('/', async (req, res, next)=>{
    try {
        const cargos = await cargoService.find()
        res.json(cargos).status(200)
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next)=>{
    try {
        const cargo = req.body
        const newCargo = await cargoService.create(cargo)
        res.json(newCargo).status(200)
    } catch (error) {
        next(error)
    }
})

router.patch('/update', async(req, res, next)=>{
    try {
        const oldCargo = req.body
        const idCargo = oldCargo.id_cargo
        const updated = await cargoService.update(idCargo, oldCargo)
        res.json(updated).status(200)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const cargo = await cargoService.findById(id)
        res.status(200).send(cargo)
    } catch (error) {
        res.status(error.codigo).send(error)
    }
})

router.delete('/:id', async(req, res, next)=>{
    try {
        const { id } = req.params
        const deleted = await cargoService.delete(id)
        res.json(deleted).status(200)
    } catch (error) {
        next(error)
    }
})

module.exports = router