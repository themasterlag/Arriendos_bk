const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_detalle', {
    id_detalle: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pago_arriendo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pago_arriendo',
        key: 'id_pago_arriendo'
      }
    },
    id_punto_venta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo_contrato: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_responsable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_autorizado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_autorizado_adm: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago_detalle',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "pago_detalle_pkey",
        unique: true,
        fields: [
          { name: "id_detalle" },
        ]
      },
    ]
  });
};
