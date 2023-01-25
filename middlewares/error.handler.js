//Creamos función que nos hará llegar a un middleware de tipo error:
function logErrors (err, req, res, next) {
  console.error(err);
   //mostrar el error en servidor para poder monitorearlo
  next(err);
  //importante para saber que se esta enviando a un middleware de tipo error,
  //si no tiene el error dentro entonces se esta mandando a uno normal
}

// Crear formato para devolverlo al cliente que
// se complementa con la función anterior:
function errorHandler(err, req, res, next) {
  res.status(500).json({
    //indicar que el error es estatus 500 Internal Server Error
    codigo: 0,
    message: err.message,
    //stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
