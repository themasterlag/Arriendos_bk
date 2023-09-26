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

            let personal 
            let rta = [];
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                element.identificacion = element.identificacion.toString();
                personal = await this.traerPersonalByIdentificacion(element.identificacion, true);
                if(personal == null){
                    let crear = await this.crearPersonal(element);
                    crear.dataValues['operacion'] = 'creado'
                    rta.push(crear);
                }else{
                    let actualizar = await personal.update(element);
                    actualizar.dataValues['operacion'] = 'actualizado'
                    rta.push(actualizar);
                }
            }            
            return rta;
        } catch (error) {
            throw error;
        }
    }

    static async crearPersonal(data){
        let personal;
        const find_personal = await this.traerPersonalByIdentificacion(data.identificacion, true);
        if(find_personal == null){
            personal = await con.models.personalvinculado.create(data);
        }else{
            throw {message: 'Personal ya existe con número de identificación', codigo: 500};
        }
        return personal;
    }

    static async actualizarPersonal(data) {
        let rta
        const find_personal = await con.models.personalvinculado.findByPk(data.id);
        if(find_personal == null){
            throw {message: 'No existe personal con id', codigo: 500};
        }else{
            rta = await find_personal.update(data)
        }
        return rta;
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