const con = require('../libs/sequelize');
var xlsx = require('xlsx');
const fs = require('fs');

class personalVinculadoService{

    static async leerExcel(archivo) {
        try {
            // console.log(archivo.file.data);
            const workbook = xlsx.read(archivo.file.data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(worksheet);
             
            return data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = personalVinculadoService