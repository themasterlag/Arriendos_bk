const express = require('express');
const router = express.Router();

const SaldoCreditoPagoService = require('./../services/saldoCreditoPago.service');
const SaldoCreditoService = require('./../services/saldoCredito.service');

const service = new SaldoCreditoPagoService();
const serviceCredito = new SaldoCreditoService();

router.get("/", async (req, res) =>{
    try{
        const datos = await service.findAll();
        res.status(200).send(datos);
    }
    catch(error){
        res.status(500).send(error);
    }
});

router.post('/', async (req, res, next) => {
  try {

    const body = req.body;
    const credito = await serviceCredito.findOne(body.id_saldo_credito);
    const newPagoCredito = await service.create(body);
    let creditoActualizado = null;

    if (newPagoCredito) {
        creditoActualizado = await serviceCredito.abonarSaldoCredito(credito.id_saldo_credito, newPagoCredito.valor_pago)
    }

    res.status(201).json(creditoActualizado);
    
  } catch (error) {
    console.log(error);
    res.status(error.codigo).send(error);
  }
});

module.exports = router;
