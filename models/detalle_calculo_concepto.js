const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalle_calculo_concepto', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_contrato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contrato',
        key: 'id_contrato'
      }
    },
    id_concepto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'conceptos',
        key: 'id_concepto'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    periodo_incremento: {
      type: DataTypes.ENUM("antes","despues"),
      allowNull: true
    },
    valor_antes_incremento: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    valor_despues_incremento: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detalle_calculo_concepto',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "detalle_calculo_concepto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
