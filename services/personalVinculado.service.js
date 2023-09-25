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

            data.forEach(element => {
                let personal = this.traerPersonalByIdentificacion(element.identificacion, true);
                if (personal.lenght == 0){
                    this.crearPersonal(element);
                } else {
                    this.actualizarPersonal(element)
                }                
            });
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async crearPersonal(data){
        try {
            let personal
            if(this.traerPersonalByIdentificacion(data.identificacion)){
                throw {message: "Personal ya existe", codigo: 404};
            }else{
                personal = await con.models.personalvinculado.create(data);
            }
            return personal;
        } catch (error) {
            throw {message: 'Error al crear', codigo: 500};
        }
    }

    static async actualizarPersonal(data) {
        try {
            let personal
            let personal_find = this.traerPersonalByIdentificacion(data.identificacion)
            console.log(personal_find);

            personal = await personal_find.update(data);
            return personal;
        } catch (error) {
            console.log(error)
            throw {message: 'Error al traer el personal', codigo: 500};
        }
    }

    static async traerPersonal(){
        try {
            const personal = await con.models.personalvinculado.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            return personal;
            // const query = 'SELECT * FROM arriendos.personalvinculado';
            // const [data] = await con.query(query);
            // return data;
        } catch (error) {
            console.log(error)
            throw {message: 'Error al traer el personal', codigo: 500};
        }
    }

    static async traerPersonalByIdentificacion(data, returnData = false) {      
        const personal = await con.models.personalvinculado.findOne({
            where:{
                identificacion: data
            }
        });
        if (!personal && !returnData) {
            throw {message: "No existe personal", codigo: 404};
        }
        return personal;
    }

}

module.exports = personalVinculadoService