const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_concepto', {
    id_detalle_concepto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pago_arriendo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_concepto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'conceptos',
        key: 'id_concepto'
      }
    },
    pago_concepto_valor: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago_concepto',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "detalle_concepto_pkey",
        unique: true,
        fields: [
          { name: "id_detalle_concepto" },
        ]
      },
    ]
  });
};
