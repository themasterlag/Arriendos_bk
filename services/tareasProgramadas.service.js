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
    }

    enviarContratosRenovar(){
        try {
            cron.schedule("0 0 8 11 * *", async function () {
                let servicioContrato = new contratoService();
                let contratos = await servicioContrato.traerContratosRenovacionProxima(1);
                console.log("contratos", contratos.length);
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
                    <h4>Para mas detalles ingrese al software de gestion de arriendos</h4>
                    <hr/>
                    <br/>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID Contrato</th>
                                <th>Valor Canon</th>
                                <th>Fecha Inicio Contrato</th>
                                <th>Fecha Fin Contrato</th>
                                <th>Años Prorroga</th>
                                <th>PDV</th>
                                <th>PDV Nombre</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
                        for (var i = 0; i < contratos.length; i++) {
                            var contrato = contratos[i];
                            htmlTabla += `
                            <tr>
                                <td>${contrato.id_contrato}</td>
                                <td>${contrato.valor_canon}</td>
                                <td>${contrato.fecha_inicio_contrato}</td>
                                <td>${contrato.fecha_fin_contrato}</td>
                                <td>${contrato.anios_prorroga}</td>
                                <td>${contrato.pvdetalle.codigo_oficina}</td>
                                <td>${contrato.pvdetalle.nombre_comercial}</td>
                            </tr>`;
                        }
    
                    // Cerrar la cadena HTML
                    htmlTabla += `
                        </tbody>
                    </table>
                    </body>
                    </html>`;
    
                    let servicioEmail = new EmailService();
    
                    const mailData = {
                        from: process.env.EMAIL_ADDRESS,
                        to: ['robertbetancourt011@gmail.com','camilo.campos@ganagana.com.co'],
                        subject: 'Contratos por vencer ' + new Date().toISOString(),
                        text: '',
                        html: htmlTabla,
                    };
    
                    servicioEmail.enviarEmail(mailData);
                }
    
                console.log("Ejecutando una tarea cada "+meses+" segundos", new Date());  
            });
        } catch (error) {
            const mailData = {
                from: process.env.EMAIL_ADDRESS,
                to: ['camilo.campos@ganagana.com.co'],
                subject: 'Error en tarea programada: contratos por vencer',
                text: '',
                html: '<h1>Error en tarea programada: contratos por vencer</h1> <br/><br/><hr/> <strong><h3>Error detectado: </h3><strong/> <br/>' + error,
            };

            servicioEmail.enviarEmail(mailData);
        }
    }
}

module.exports = TareasProgramadas;