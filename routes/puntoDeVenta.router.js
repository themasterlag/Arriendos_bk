const express = require('express');

const router = express.Router();
const PuntoDeVentaService = require('./../services/puntodeventa.service');
const puntoVentaService = new PuntoDeVentaService();//crear una instancia del servicio

const service = new PuntoDeVentaService();

router.get('/', async (req, res, next) => {
  try {
    const puntosdeventa = await service.find();

    res.status(201).json(puntosdeventa);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});
router.get('/sincontrato', async (req, res, next) => {
  try {
    const puntosdeventa = await service.findPuntoWithoutContrato();
    res.status(201).json(puntosdeventa);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/codigo-sitventa/:codigo', async (req, res, next) => {
  try {
    const { codigo } = req.params;
    const puntoDeventa = await service.findByCodigoSitioVenta(codigo);
    res.status(201).json(puntoDeventa);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const puntoDeVenta = await service.findOne(id);
    res.status(200).json(puntoDeVenta);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    /*
    al momento de crear un punto de venta este
    debe estar relacionaco con un propietario(arrendador)
    */
    const newPuntoDeVenta = await service.create(body);

    res.status(201).json({
      estado: '1',
      id: newPuntoDeVenta,
      respuesta: 'se agrego correctamente el punto de venta',
    });
  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      console.log(error)
      res.status(500).send(error);
      
    }
  }
});

router.patch('/update', async (req, res, next) => {
  try {
    const body = req.body;
    const id = body.id_punto_venta;
    console.log(body); 
    const newPuntoDeVenta = await service.update(id, body);
    res.status(201).json({
      estado: '1',
      id: newPuntoDeVenta.id_punto_venta,
      respuesta: 'Se actualizo correctamente el contrato',
    });
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

router.patch('/actualizar', async (req, res, next) => {
  try {
    const body = req.body;
    const id = body.codigo_sitio_venta;
    console.log(body); 
    const newPuntoDeVenta = await service.update(id, body);
    res.status(201).json({
      estado: '1',
      id: newPuntoDeVenta.codigo_sitio_venta,
      respuesta: 'Se actualizo correctamente el desplegable',
    });
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});


// router.patch('/inhabilitar', async (req, res, next) => {
//   console.log('Ruta de inhabilitación de punto de venta alcanzada'); // Agrega este registro
//   console.log('Datos recibidos en la solicitud:', req.body);
//   try {
//     console.log(res.body);
//     let { id, fecha_inactivo, razon_inactivo } = req.body;
//     const resultado = await service.inhabilitarPuntoDeVenta(
//       id,
//       fecha_inactivo,
//       razon_inactivo
//     );
//     res.status(200).json({
//       estado: '1',
//       id: resultado,
//       respuesta: 'Se ha inhabilidato el punto de venta correctamente',
//     });
//   } catch (error) {
//     res.status(error.codigo).send(error);
//   }
// });

// router.patch('/inhabilitar', async (req, res, next) => {
//   try {
//     const { id, fecha_inactivo, razon_inactivo } = req.body;
    
//     // Llama a la función del servicio para inhabilitar el punto de venta
//     const resultado = await puntoVentaService.inhabilitarPuntoDeVenta(id, fecha_inactivo, razon_inactivo);

//     // Envía una respuesta exitosa
//     res.status(200).json({ message: 'Punto de venta inhabilitado con éxito', id: resultado });
//   } catch (error) {
//     console.error('Error al inhabilitar el punto de venta:', error);
//     res.status(500).json({ message: 'Error al inhabilitar el punto de venta' });
//   }
// });

// router.patch('/inhabilitar', async (req, res, next) => {
//   try {
//     const { codigo_sitio_venta, fecha_inactivo, razon_inactivo } = req.body;
    
//     // Llama a la función del servicio para inhabilitar el punto de venta
//     const resultado = await puntoVentaService.inhabilitarPuntoDeVenta(codigo_sitio_venta, fecha_inactivo, razon_inactivo);

//     // Envía una respuesta exitosa
//     res.status(200).json({ message: 'Punto de venta inhabilitado con éxito', codigo_sitio_venta: resultado });
//   } catch (error) {
//     console.error('Error al inhabilitar el punto de venta:', error);
//     res.status(500).json({ message: 'Error al inhabilitar el punto de venta' });
//   }
// });

router.patch('/inhabilitar', async (req, res, next) => {
  try {
    const { codigo_sitio_venta, fecha_inactivo, razon_inactivo } = req.body;

    // Llama a la función del servicio para inhabilitar el punto de venta
    const resultado = await puntoVentaService.inhabilitarPuntoDeVenta(codigo_sitio_venta, fecha_inactivo, razon_inactivo);

    // Envía una respuesta exitosa
    res.status(200).json({ message: 'Punto de venta inhabilitado con éxito', codigo_sitio_venta: resultado });
  } catch (error) {
    console.error('Error al inhabilitar el punto de venta:', error);
    res.status(500).json({ message: 'Error al inhabilitar el punto de venta' });
  }
});

router.patch('/habilitar', async (req, res, next) => {
  try {
    const { codigo_sitio_venta } = req.body;

    // Llama a la función del servicio para habilitar el punto de venta
    const resultado = await puntoVentaService.habilitarPuntoDeVenta(codigo_sitio_venta);

    // Envía una respuesta exitosa
    res.status(200).json({ message: 'Punto de venta habilitado con éxito', codigo_sitio_venta: resultado });
  } catch (error) {
    console.error('Error al habilitar el punto de venta:', error);
    res.status(500).json({ message: 'Error al habilitar el punto de venta' });
  }
});


router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    const puntoDeVenta = await service.delete(id);
    res.status(201).json(puntoDeVenta);
  } catch (error) {
    res.status(error.codigo).send(error);
  }
});

module.exports = router;
