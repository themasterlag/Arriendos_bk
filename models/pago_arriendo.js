const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_arriendo', {
    id_pago_arriendo: {
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
    valor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago_arriendo',
    schema: 'arriendos',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "pago_arriendo_pkey",
        unique: true,
        fields: [
          { name: "id_pago_arriendo" },
        ]
      },
    ]
  });
};
