const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contrato_tipo_servicio', {
    id_contrato_servicio: {
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
    id_tipo_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_servicio',
        key: 'id_tipo_servicio'
      }
    },
    porcentaje: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contrato_tipo_servicio',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "contrato_tipo_servicio_pkey",
        unique: true,
        fields: [
          { name: "id_contrato_servicio" },
        ]
      },
    ]
  });
};
