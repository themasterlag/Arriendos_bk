const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conceptos', {
    id_concepto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_concepto: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nombre_concepto: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cuenta_contable: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    operacion: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tipo_concepto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_concepto',
        key: 'id_tipo_concepto'
      }
    },
    porcentaje_operacion: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'conceptos',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "conceptos_pkey",
        unique: true,
        fields: [
          { name: "id_concepto" },
        ]
      },
    ]
  });
};
