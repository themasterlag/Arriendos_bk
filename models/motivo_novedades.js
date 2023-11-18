const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('motivo_novedades', {
    id_motivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    limite_cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cada_cuantos_meses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cantidad_dias_pagos: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_tipo_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_pago_novedades',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'motivo_novedades',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "motivo_novedades_pkey",
        unique: true,
        fields: [
          { name: "id_motivo" },
        ]
      },
    ]
  });
};
