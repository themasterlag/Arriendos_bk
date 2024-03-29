const express = require('express');

const router = express.Router();
const UsuarioService = require('./../services/usuario.service');
const autJwt = require('../middlewares/veriLogJwt');
const errorHandler = require('../middlewares/error.handler');
const service = new UsuarioService();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin", "Content-Type", "Accept"
  );
  next();
});

router.get('/', async (req, res, next) => {

  try {

    if (autJwt.verifyToken(req, res) == 200) {
      let isAdmin = await autJwt.isAdmin(req, res)
      if (isAdmin.statusCode == 200) {
        res.status(200).json(await service.find());
      }

    }
  } catch (error) {
    errorHandler.errorHandler(error, req, res, next)
  }
});

router.get('/todos', async (req, res, next)=>{
  try {
    const usuarios = await service.find();
    res.json(usuarios).status(200);
  } catch (error) {
    res.status(error.codigo).json(error);
  }
})

router.get('/subproceso/:subproceso', async (req, res, next)=>{
  try {
    const { subproceso } = req.params;
    const usuarios = await service.findBySubprocess(subproceso);
    res.status(200).json(usuarios);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }else{ 
      res.status(500).send(error);
    }
  }
})

router.get('/proceso/:proceso', async (req, res, next)=>{
  try {
    const { proceso } = req.params;
    const usuarios = await service.findByProcess(proceso);
    res.status(200).json(usuarios);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }else{ 
      res.status(500).send(error);
    }
  }
})

router.get('/documento/:id', async (req, res, next)=>{
  try {
    const { id } = req.params
    const usuario = await service.findByDocumento(id)
    res.status(200).json(usuario)
  } catch (error) {
    res.status(error.codigo).json(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await service.findOne(id);
    console.log(users);
    res.json(users);
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
});

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(error.codigo).send(error);
    }
  });

router.patch('/update',
  async (req, res, next) => {
    try {
      const body = req.body
      const id = body.id_usuario;
      const newCategory = await service.update(id, body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(error.codigo).json(error);
    }
  });

router.patch('/inhabilitar',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const newCategory = await service.inhabilitarUsuario(id);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(error.codigo).json(error);
    }
  });
  router.patch('/habilitar',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const newCategory = await service.habilitarUsuario(id);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(error.codigo).json(error);
    }
  });

module.exports = router;



