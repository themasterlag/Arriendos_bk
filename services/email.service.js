const con = require('../libs/sequelize');
const nodemailer = require('nodemailer');

class EmailService {
    transportador = nodemailer.createTransport({
        port: process.env.EMAIL_HOST_PORT,
        host: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: false,
    });

    constructor() {
    }

    async enviarEmail(mailData){    
        try {
            this.transportador.sendMail(mailData, function (err, info) {
                if(err){
                    console.log(err);
                    return err;
                }else{
                    console.log(info);
                    return info;
                }
            });
        } catch (error) {
            throw {codigo: 500, message: error};
        }
    }
}

module.exports= EmailService;