const con = require('../libs/sequelize');
var xlsx = require('xlsx');
const fs = require('fs');

class personalVinculadoService{

    static async leerExcel(archivo) {
        try {
            const workbook = xlsx.read(archivo.file.data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(worksheet);

            const tipo = data[0].tipo_personal;

            let personal 
            let rta = [];
            let numIdentificacion = [];
            if(data[0].nombre == null && data[0].cargo == null && data[0].identificacion == null && tipo == null){
                throw {message: 'El archivo no cuenta con la estructura', codigo: 400}
            }else{
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    element.identificacion = element.identificacion.toString();
                    personal = await this.traerPersonalByIdentificacion(element.identificacion, true);
                    if(personal == null){
                        element['estado'] = true;
                        let crear = await this.crearPersonal(element);
                        crear.dataValues['operacion'] = 'creado';
                        rta.push(crear);

                    }else{
                        element.fecha_actualizacion = new Date();
                        element['estado'] = true;
                        element['tipo_personal'] = tipo;
                        let actualizar = await personal.update(element);
                        actualizar.dataValues['operacion'] = 'actualizado'
                        rta.push(actualizar);
                    }
                    numIdentificacion.push(element.identificacion);
                }     
                
                // const query = 'SELECT * FROM arriendos.personalvinculado WHERE identificacion NOT IN (?)';
                // const [datosNoExcel] = await con.query(query, [numIdentificacion]);
                const query = await con.models.personalvinculado.findAll({
                    where: {
                        identificacion: {
                            [con.Sequelize.Op.notIn]: numIdentificacion
                        },
                        tipo_personal: tipo
                    },
                    order: [
                        ['id', 'ASC']
                    ]
                })
                
                for (const personalBD of query){
                    personalBD.estado = false;
                    await personalBD.save();
                }

                return rta;
            }
        } catch (error) {
            throw error;
        }
    }

    static async crearPersonal(data){
        let personal;
        const find_personal = await this.traerPersonalByIdentificacion(data.identificacion, true);
        if(find_personal == null){
            data['estado'] = true;
            personal = await con.models.personalvinculado.create(data);
        }else{
            throw {message: 'Personal ya existe con número de identificación', codigo: 400};
        }
        return personal;
    }

    static async actualizarPersonal(data) {
        let rta
        const find_personal = await con.models.personalvinculado.findByPk(data.id);
        if(find_personal == null){
            throw {message: 'No existe personal con id', codigo: 404};
        }else{
            rta = await find_personal.update(data)
        }
        return rta;
    }

    static async crearExcel(){
        let carguePersonal = [];
        let personal = await this.traerPersonal();

        for (let i = 0; i < personal.length; i++) {
            const element = personal[i];

            delete element.dataValues.id
            if(element.dataValues.estado == false){
                element.dataValues.estado = 'Inactivo';
            }else{
                element.dataValues.estado = 'Activo';
            }
            carguePersonal.push(element.dataValues);
        }
        const ws = xlsx.utils.json_to_sheet(carguePersonal);
        
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Personal vinculado');
        
        let archivo = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx'});

        return archivo;
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
            throw {message: 'Error al traer el personal', codigo: 404};
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


    static async habilitarPersonal(id){
        const personal = await con.models.personalvinculado.findByPk(id);
        personal.update({ estado: 1 , fecha_actualizacion: new Date()});
        return personal;
    }

    static async inhabilitarPersonal(id){
        const personal = await con.models.personalvinculado.findByPk(id)
        personal.update({ estado: 0 , fecha_actualizacion: new Date() });
        return personal;
    }

}

module.exports = personalVinculadoService