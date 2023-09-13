const express = require('express');

const router = express.Router();
const EmailService = require('../services/email.service');

const service = new EmailService();

router.get('/', async (req, res) => {
    try {

        const mailData = {
            to: 'robertbetancourt011@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'easy!',
            html: '<b>Hey there! </b><br> <h1>Puto el que lo lea</h1>',
        };

        const email = await service.enviarEmail(mailData);
        res.status(200).send(email);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;