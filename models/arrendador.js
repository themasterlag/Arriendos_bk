const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arrendador', {
    id_arrendador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo_documento: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numero_documento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "numero_documento"
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    numero_contacto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numero_contacto2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo_persona: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_persona',
        key: 'id_tipo_persona'
      }
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'municipio',
        key: 'id_municipio'
      }
    },
    id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamento',
        key: 'id_departamento'
      }
    },
    fecha_creacion_arrendador: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'arrendador',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "arrendador_pkey",
        unique: true,
        fields: [
          { name: "id_arrendador" },
        ]
      },
      {
        name: "numero_documento",
        unique: true,
        fields: [
          { name: "numero_documento" },
        ]
      },
    ]
  });
};
