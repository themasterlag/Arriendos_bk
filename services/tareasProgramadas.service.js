const cron = require("node-cron");
const EmailService = require("./email.service");
const contratoService = require("./contrato.service");

// Formato de tiempo para ejecución
// ┌────────────── segundo (0 - 59) (opcional)
// │ ┌──────────── minuto (0 - 59) 
// │ │ ┌────────── hora (0 - 23)
// │ │ │ ┌──────── día de mes (1 - 31)
// │ │ │ │ ┌────── mes (1 - 12)
// │ │ │ │ │ ┌──── día de la semana (0 - 6) (0 y 7 ambos representan el domingo)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

// “*”: El asterisco significa cada intervalo. Por ejemplo, si el símbolo de asterisco está en el mes, significa que la tarea se ejecutará todos los meses.
// “,”: La coma nos permite especificar una lista de valores para repetir. Por ejemplo, si tenemos 1, 3, 5 en el campo mes, la tarea se ejecutará en los meses 1,3 y 5 (enero, febrero y mayo).
// “-“: El guión nos permite especificar un rango de valores. Por ejemplo, si tenemos 1 -5 en el campo día de la semana, la tarea se ejecutará todos los días de la semana (de lunes a viernes).
// “/”: La barra inclinada o slash nos permite especificar expresiones como “cada intervalo x”. Si tenemos */4 en el campo hora, significa que la acción se realizará cada 4 horas.
 
class TareasProgramadas{
    constructor() {}

    programarTareas(){
        this.enviarContratosRenovar();
        this.alertaIncrementos();
        this.actualizarCanonDiario();
    }

    alertaIncrementos(){
        cron.schedule("0 0 18 15 12 *", async function () {
            let servicioEmail = new EmailService();
    
            const mailData = {
                from: process.env.EMAIL_ADDRESS,
                to: process.env.EMAIL_NOTIFICATION.split(','),
                subject: 'Actualización de parametros anuales',
                text: '',
                html: '<h4>Recordatorio para la actualización de incrementos anuales</h4>',
            };
            servicioEmail.enviarEmail(mailData);
        })
    }

    enviarContratosRenovar(){
        try {
            cron.schedule("0 0 8 19 * *", async function () {
                let servicioContrato = new contratoService();
                let contratos = await servicioContrato.traerContratosRenovacionSiguienteMes();

                if (contratos.length > 0) {
                    var estiloBootstrap = `
                    <style>
                        .table {
                            width: 100%;
                            margin-bottom: 1rem;
                            color: #212529;
                        }
                        .table th,
                        .table td {
                            padding: 0.75rem;
                            vertical-align: top;
                            border-top: 1px solid #dee2e6;
                        }
                        .table thead th {
                            vertical-align: bottom;
                            border-bottom: 2px solid #dee2e6;
                        }
                        .table tbody + tbody {
                            border-top: 2px solid #dee2e6;
                        }
                        .table tbody td {
                            text-align: center;
                        }
                    </style>
                    `;
    
                    var htmlTabla = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <title>Tabla de Contratos</title>
                    ${estiloBootstrap}
                    </head>
                    <body>
                    <h1>Lista contratos proximos a vencer</h1>
                    <h4>Para mas detalles ingrese al software Nexus</h4>
                    <hr/>
                    <br/>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>PDV</th>
                                <th>PDV Nombre</th>
                                <th>Valor Canon</th>
                                <th>Fecha Inicio Contrato</th>
                                <th>Fecha Fin Contrato</th>
                                <th>Años Prorroga</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
                        for (var i = 0; i < contratos.length; i++) {
                            var contrato = contratos[i];
                            htmlTabla += `
                            <tr>
                                <td>${contrato.pvdetalle.codigo_sitio_venta}</td>
                                <td>${contrato.pvdetalle.nombre_comercial}</td>
                                <td>${contrato.valor_canon}</td>
                                <td>${contrato.fecha_inicio_contrato}</td>
                                <td>${contrato.fecha_fin_contrato}</td>
                                <td>${contrato.anios_prorroga}</td>
                            </tr>`;
                        }
    
                    // Cerrar la cadena HTML
                    htmlTabla += `
                        </tbody>
                    </table>
                    </body>
                    </html>`;
    
                    let servicioEmail = new EmailService();

                    // Obtener el mes siguiente
                    const mesActual = new Date().getMonth();
                    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                    // Asegurar que el índice esté dentro del rango después de incrementarlo
                    const nombreMesSiguiente = meses[(mesActual + 1) % 12];
    
                    const mailData = {
                        from: process.env.EMAIL_ADDRESS,
                        to: process.env.EMAIL_NOTIFICATION.split(','),
                        subject: `Contratos por vencer en ${nombreMesSiguiente} ${new Date().getFullYear()}`,
                        text: '',
                        html: htmlTabla,
                    };
                    servicioEmail.enviarEmail(mailData);
                }else{
                    let servicioEmail = new EmailService();
    
                    let htmlTabla = `
                    <h1>Lista contratos proximos a vencer</h1>
                    <h4>Para mas detalles ingrese al software Nexus</h4>
                    <hr/>
                    <br/>
                    <h4>No hay contratos a vencer para el siguiente mes</h4>`;

                    const mailData = {
                        from: process.env.EMAIL_ADDRESS,
                        to: process.env.EMAIL_NOTIFICATION.split(','),
                        subject: 'Contratos por vencer ' + new Date().toISOString(),
                        text: 'No hay contratos por vencer',
                        html: htmlTabla,
                    };
                    servicioEmail.enviarEmail(mailData);
                }
            });
        } catch (error) {
            const mailData = {
                from: process.env.EMAIL_ADDRESS,
                to: process.env.EMAIL_NOTIFICATION.split(','),
                subject: 'Error en tarea programada: contratos por vencer',
                text: '',
                html: '<h1>Error en tarea programada: contratos por vencer</h1> <br/><br/><hr/> <strong><h3>Error detectado: </h3><strong/> <br/>' + error,
            };

            servicioEmail.enviarEmail(mailData);
        }
    }

    actualizarCanonDiario(){
        cron.schedule("0 6 * * *", async () => {
            try {
                let servicioContrato = new contratoService();
                let contratosActualizados = await servicioContrato.actualizarCanonContratoDiario();
                console.log(`${contratosActualizados} contratos han sido actualizados en su aniversario.`);
            } catch (error) {
                console.error('Error al actualizar el canon de los contratos en su aniversario cada 2 minutos: ', error);
            }
        });
    }    
}

module.exports = TareasProgramadas;