const express = require('express');

const router = express.Router();
const Service = require('./../services/entidadBancaria');

const service = new Service();

router.get('/', async(req,res,next)=>{
  try {
      const entidades = await service.find();
      res.status(201).json(entidades);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const entidad = await service.findById(id);
    console.log(entidad);
    res.status(200).json(entidad);
  } catch (error) {
    next(error);
  }
});


router.get('/:nombre', async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const banco = await service.findOneBanco(nombre); 
    if (banco) {
      res.status(200).json(banco);
    } else {
      res.status(404).json({ mensaje: 'Banco no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});




router.post('/registrar', async (req, res, next) => {
  try {
    const entidadBancaria = req.body;

    if ('entidad_bancaria' in entidadBancaria && typeof entidadBancaria.entidad_bancaria === 'string' && entidadBancaria.entidad_bancaria.trim() !== '') {
      // La propiedad entidad_bancaria es una cadena no vacía
      const newBanco = await service.create(entidadBancaria);
      res.status(201).json(newBanco);
    } else {
      // La propiedad entidad_bancaria no es válida
      res.status(400).json({ error: 'La propiedad entidad_bancaria es requerida y debe ser una cadena no vacía' });
    }
  } catch (error) {
    next(error);
  }
});


router.patch('/update', async (req, res, next) => {
  try {
    const updatedData = req.body;
    const idEntidadBancaria = updatedData.id_entidad_bancaria; // Columna de ID correcta
    const updatedEntity = await service.modify(idEntidadBancaria, updatedData.nuevoNombre);
    res.json(updatedEntity).status(200);
  } catch (error) {
    next(error);
  }
});

router.patch('/update/:id', async (req, res, next) => {
  try {
    const updatedData = req.body;
    const idEntidadBancaria = updatedData.id_entidad_bancaria; // Columna de ID correcta
    const updatedEntity = await service.modify(idEntidadBancaria, updatedData.nuevoNombre);
    res.json(updatedEntity).status(200);
  } catch (error) {
    next(error);
  }
});




router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.status(200).json({ message: 'Banco eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
