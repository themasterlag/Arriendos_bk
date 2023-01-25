
const SolicitudService = require('./solicitud.service');
const ArrendadorService = require('./arrendador.service');
const PuntoDeVentaService = require('./puntodeventa.service');
const ContratoService = require('./contrato.service');
const ArrendadorContratoService = require('./arrendadorContrato.service');
const arrendadorContrato = new ArrendadorContratoService();
const contrato = new ContratoService();
const puntoDeVenta = new PuntoDeVentaService();
const solicitud = new SolicitudService();
const arrendador = new ArrendadorService();
class RegistrarPuntoService{
  constructor(){

  }
  async registrarFormulario(data){
    try {
      console.log(data);
      //this.guardarSolicitud(data.datos_solicitud)

      var arrendador = await this.guardarArrendador(data.datos_arrendador)
     console.log(arrendador+' el id del arrendador');
      var puntoVenta = await this.guardarPuntoDeVenta(data.datos_punto_de_venta)
      this.guardarContrato(data.contrato, arrendador, puntoVenta)
    } catch (error) {
      console.error(error);
    }

  }
  async guardarSolicitud(data){
    return solicitud.create(data);
  }
  async guardarArrendador(data){
    return arrendador.create(data);
  }
  async guardarPuntoDeVenta(data){
    return puntoDeVenta.create(data)
   }
   /* cuando se crea un contrato este se relaciona con la tabla arrendador_contrato para
    cumplir con la relacion muchos a muchos
    entonces primero se guarda el contrato en base de datos para asi obtener el identificador
    para despues hacer la relacion con el arrendador
   */
  async guardarContrato(newContrato, arrendador, puntodeventa){
      // primero guarda el contrato
      newContrato.id_punto_venta = puntodeventa;
      console.log(newContrato);
      const contratoid = await contrato.create(newContrato);
      console.log(contratoid);
      const arrendadorpdv = {
          id_arrendador: arrendador,
          id_punto_de_venta : puntoDeVenta
      }
      // se hace la relacion con el id del arrendador
     await arrendadorContrato.create(arrendadorpdv);
   }
}
module.exports = RegistrarPuntoService;
