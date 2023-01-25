const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solicitud', {
    id_solicitud: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_solicitud: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nombre_solicitante: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_proceso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proceso',
        key: 'id_proceso'
      }
    },
    encargado: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'solicitud',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "solicitud_pkey",
        unique: true,
        fields: [
          { name: "id_solicitud" },
        ]
      },
    ]
  });
};
