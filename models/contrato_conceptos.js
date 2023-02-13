const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contrato_conceptos', {
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
    id_contrato_concepto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'contrato_conceptos',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "contrato_conceptos_pkey",
        unique: true,
        fields: [
          { name: "id_contrato_concepto" },
        ]
      },
    ]
  });
};
