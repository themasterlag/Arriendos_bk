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
    }
  }, {
    sequelize,
    tableName: 'contrato_conceptos',
    schema: 'arriendos',
    timestamps: false
  });
};
