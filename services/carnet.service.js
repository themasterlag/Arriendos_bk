const { createCanvas, loadImage } = require('canvas');
const QRCode = require('qrcode');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const crypto = require('crypto');


class CarnetService {
    person = null;

    constructor(data){
        this.person = data;
    }

    async generateImage(){
        try {
            // Cargar la imagen desde el archivo PNG
            let image = await loadImage('resources/businessCardVertical.png');

            // Crear un lienzo (canvas) con las mismas dimensiones que la imagen
            let canvas = createCanvas(image.width, image.height);
            let ctx = canvas.getContext('2d');

            // Dibuja la imagen en el lienzo
            ctx.drawImage(image, 0, 0);


            // -----------------------------QR en carnet-----------------------------------
            // Generar el código QR para la URL y guardarlo en un archivo
            const url = process.env.WEB_URL+'/carnet/'+this.person.identificacion; // Reemplaza con tu URL
            const qrCodePath = 'temp/qrCode.png'; // Ruta para guardar el código QR
            await QRCode.toFile(qrCodePath, url, { 
                errorCorrectionLevel: 'H', 
                color: {
                    dark: '#000000',   // Color oscuro (código QR)
                    light: '#fff0',    // Color claro transparente (fondo del código QR)
                }
            });

            // Cargar el código QR como una imagen en el lienzo
            const qrCodeImage = await loadImage(qrCodePath);

            // Elimina el PDF guardado
            fs.unlink(qrCodePath, err => {
                if (err) {
                    throw error;
                }
            });

            // Calcular la posición del código QR en la imagen
            const qrCodeX = (canvas.width - qrCodeImage.width) / 2;
            const qrCodeY = (canvas.height - qrCodeImage.height) / 4.8;

            // Dibujar el código QR en el lienzo
            ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY);


            // -----------------------------Nombres en carnet-----------------------------------
            // Configura el estilo de texto
            let text = this.person.nombre;
            let fontSize = 37;
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = 'black';
            
            // Calcula la posición del texto para que esté en el centro de la imagen
            let textWidth = ctx.measureText(text).width;
            let textX = (canvas.width - textWidth) / 2; // Centro en el eje X
            let textY = (canvas.height + fontSize) / 2.8; // Cabecera del eje Y

            // Agrega texto en la posición deseada
            ctx.fillText(text, textX, textY);

            // -----------------------------Apellidos en carnet-----------------------------------
            // Configura el estilo de texto
            text = this.person.apellido;
            fontSize = 35;
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = 'black';
            
            // Calcula la posición del texto para que esté en el centro de la imagen
            textWidth = ctx.measureText(text).width;
            textX = (canvas.width - textWidth) / 2; // Centro en el eje X
            textY = (canvas.height + fontSize) / 2.5; // Cabecera del eje Y

            // Agrega texto en la posición deseada
            ctx.fillText(text, textX, textY);


            // -----------------------------Documento en carnet-----------------------------------
            // Configura el estilo de texto
            text = "D.I: "+this.person.identificacion;
            fontSize = 32;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'black';
            
            // Calcula la posición del texto para que esté en el centro de la imagen
            textWidth = ctx.measureText(text).width;
            textX = (canvas.width - textWidth) / 2; // Centro en el eje X
            textY = (canvas.height + fontSize) / 2.2; // Cabecera del eje Y

            // Agrega texto en la posición deseada
            ctx.fillText(text, textX, textY);


            // -----------------------------RH en carnet-----------------------------------
            // Configura el estilo de texto
            text = "RH: "+this.person.rh;
            fontSize = 33;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'black';
            
            // Calcula la posición del texto para que esté en el centro de la imagen
            textWidth = ctx.measureText(text).width;
            textX = (canvas.width - textWidth) / 2; // Centro en el eje X
            textY = (canvas.height + fontSize) / 2; // Cabecera del eje Y

            // Agrega texto en la posición deseada
            ctx.fillText(text, textX, textY);


            // -----------------------------Cargo en carnet-----------------------------------
            // Configura el estilo de texto
            text = this.person.cargo;
            fontSize = 28;
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = 'black';
            
            // Calcula la posición del texto para que esté en el centro de la imagen
            textWidth = ctx.measureText(text).width;
            textX = (canvas.width - textWidth) / 2; // Centro en el eje X
            textY = (canvas.height + fontSize) / 1.85; // Cabecera del eje Y

            // Agrega texto en la posición deseada
            ctx.fillText(text, textX, textY);


             // -----------------------------Terminos en carnet-----------------------------------
            // Configura el estilo de texto
            text = 'Este carnet es personal e intransferible.'
            +'\nNo es valido para realizar transacciones comerciales'
            +'\n a nombre de la empresa.'
            +'\n '
            +'\nPara validación de la información comunicarse'
            +'\n PBX 610014 SEAPTO S.A'
            +'\nCalle 10 N° 3-56 barrio centro'
            +'\n Ibagué, Tolima.';


            // 'Este documento es personal e intransferible.'
            // +'\nIdentifica al portador como empleado de Seapto S.A.'
            // +'\nDebe llevarse en un lugar visible'
            // +'\ndentro de las instalaciones de la empresa.'
            // +'\nEste documento no es válido para realizar'
            // +'\ntransacciones comerciales a nombre de la empresa.'
            // +'\nDebe ser devuelto a la dirección de Talento Humano al'
            // +'\nmomento de su desvinculación laboral con la empresa.'
            // +'\n\nSi usted encuentra este documento,'
            // +'\nagradecemos informar al PBX:'
            // +'\n(578)2610014 Seapto S.A. Calle 10 No.3-56'
            // +'\nIbagué - Tolima Colombia'
            // +'\nSeapto S.A.';

            fontSize = 18;
            ctx.font = ` ${fontSize}px Arial`;
            ctx.fillStyle = 'black';


            // Divide el párrafo en líneas separadas
            const lineas = text.split('\n');
            
            // Calcula la altura total del párrafo
            const totalHeight = lineas.length * fontSize;
            
            // Calcula la posición vertical inicial para centrar el párrafo
            textY = (canvas.height - totalHeight) / 1.25;

            // Itera las líneas y agrega cada una centrada
            lineas.forEach((linea, index) => {
                const textWidth = ctx.measureText(linea).width;
                const textX = (canvas.width - textWidth) / 2;
                const textLineY = textY + index * fontSize;
                
                // Agrega texto en la posición deseada
                ctx.fillText(linea, textX, textLineY);
            });


            // -----------------------------Fecha actualizacion en carnet-----------------------------------
            // Configura el estilo de texto
            text = "Ultima actualizacion: "+this.person.fecha_actualizacion;
            fontSize = 20;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'black';
            
            // Calcula la posición del texto para que esté en el centro de la imagen
            textWidth = ctx.measureText(text).width;
            textX = (canvas.width - textWidth) / 2; // Centro en el eje X
            textY = (canvas.height + fontSize) / 1.17; // Cabecera del eje Y

            // Agrega texto en la posición deseada
            ctx.fillText(text, textX, textY);



            // Genera la respuesta con la imagen modificada
            // return canvas.createPNGStream()
            return canvas;
        } catch (error) {
            throw error;
        }
    }


    async generarPdf() {
        try {
            // Crear imagen en canvas
            const canvas = await this.generateImage();

            // Crear un nuevo documento PDF
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([canvas.width, canvas.height]);
            
            // Convertir el lienzo a una imagen PNG
            const canvasPng = canvas.toBuffer('image/png');
            const canvasImage = await pdfDoc.embedPng(canvasPng);


            // Agregar la imagen a la página del PDF
            page.drawImage(canvasImage, {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height,
            });

            // Generar el PDF como una respuesta
            let pdfBytes = await pdfDoc.save();

            // Guardar de forma temporal el PDF
            const filePath = 'temp/carnet.pdf';
            fs.writeFileSync(filePath, pdfBytes);
            const pdfData = fs.readFileSync(filePath);

            // this.generarLlaves()

            // // Elimina el PDF guardado
            // fs.unlink(filePath, err => {
            //     if (err) {
            //         throw error;
            //     }
            // });

            return pdfData;
        } catch (error) {
            throw error; 
        }
        
    }


    generarLlaves(){
        // Generar una clave privada
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
            type: 'spki', // Especifica el formato de la clave pública como SPKI (SubjectPublicKeyInfo)
            format: 'pem' // Formato PEM
            },
            privateKeyEncoding: {
            type: 'pkcs8', // Formato de la clave privada
            format: 'pem', // Formato PEM
            // cipher: 'aes-256-cbc', // Opcional: cifrar la clave privada
            // passphrase: '123456' // Opcional: contraseña para cifrar la clave privada
            },
        });
        
        // Guardar la clave privada en un archivo
        fs.writeFileSync('keys/private-key.pem', privateKey);
        
        // Guardar la clave pública en un archivo
        fs.writeFileSync('keys/public-key.pem', publicKey);
    }
}

module.exports = CarnetService;
