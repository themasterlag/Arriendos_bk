const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numero_documento: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numero_contacto: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    numero_contacto2: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'municipio',
        key: 'id_municipio'
      }
    },
    fecha_creacion_cliente: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    estado: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1
    },
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digito_verificacion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cliente',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "cliente_pkey",
        unique: true,
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
