const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('concepto_municipio', {
    id_concepto_municipio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_concepto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'conceptos',
        key: 'id_concepto'
      }
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'municipio',
        key: 'id_municipio'
      }
    }
  }, {
    sequelize,
    tableName: 'concepto_municipio',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "concepto_municipio_pkey",
        unique: true,
        fields: [
          { name: "id_concepto_municipio" },
        ]
      },
    ]
  });
};
