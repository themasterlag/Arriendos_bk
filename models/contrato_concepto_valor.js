const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contrato_concepto_valor', {
    contrato_concepto_valor_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contrato_concepto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contrato_conceptos',
        key: 'id_contrato_concepto'
      }
    },
    contrato_concepto_valor: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contrato_concepto_valor',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "contrato_concepto_valor_pkey",
        unique: true,
        fields: [
          { name: "contrato_concepto_valor_id" },
        ]
      },
    ]
  });
};
