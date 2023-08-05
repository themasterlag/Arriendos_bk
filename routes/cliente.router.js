const express = require('express');

const router = express.Router();

const ClienteService = require('./../services/cliente.service');

const service = new ClienteService();

router.get('/', async (req, res, next) => {
  try {
    const cliente = await service.find();
    res.json(cliente);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const clientes = await service.findOne(id);
    console.log(clientes);
    res.json(clientes);
  } catch (error) {
    next(error);
  }
});

router.get('/numero_documento/:numero_documento', async (req, res, next) => {
  try {
    const { numero_documento } = req.params;
    const clientes = await service.findOneByNumeroDocumento(numero_documento);
    //console.log(clientes);
    res.json(clientes);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const cliente = await service.update(id, body);
    res.json(cliente);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  respuesta = null;
  codigo = 201;

  try {
    const body = req.body;
    const newCliente = await service.create(body);

    respuesta = {
      estado: '1',
      id: newCliente,
      respuesta: 'se agrego correctamente el cliente',
    };
  } catch (error) {
    respuesta = error;
    codigo = 400;
  }

  res.status(codigo).json(respuesta);
});

router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    const cliente = await service.delete(id);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
