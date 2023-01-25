const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dispersion', {
    id_dispersion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pago_arriendo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_reponsable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valor_total_pagado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dispersion',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "dispersion_pkey",
        unique: true,
        fields: [
          { name: "id_dispersion" },
        ]
      },
    ]
  });
};
