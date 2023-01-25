const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago', {
    id_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_contrato_arrendador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    valor_pago: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    impuestos: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "pago_pkey",
        unique: true,
        fields: [
          { name: "id_pago" },
        ]
      },
    ]
  });
};
