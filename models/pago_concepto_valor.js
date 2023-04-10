const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_concepto_valor', {
    pago_concepto_valor_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pago_concepto_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pago_concepto_valor: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago_concepto_valor',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "pago_concepto_valor_pkey",
        unique: true,
        fields: [
          { name: "pago_concepto_valor_id" },
        ]
      },
    ]
  });
};
