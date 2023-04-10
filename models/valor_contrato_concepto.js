const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('valor_contrato_concepto', {
    id_valor_contrato_concepto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_concepto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_contrato: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valor_contrato_concepto: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'valor_contrato_concepto',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "valor_contrato_concepto_pkey",
        unique: true,
        fields: [
          { name: "id_valor_contrato_concepto" },
        ]
      },
    ]
  });
};
