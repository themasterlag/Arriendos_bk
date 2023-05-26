const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saldo_credito', {
    id_saldo_credito: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    credito_total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    credito_saldo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contrato_concepto_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'saldo_credito',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "saldo_credito_pkey",
        unique: true,
        fields: [
          { name: "id_saldo_credito" },
        ]
      },
    ]
  });
};
