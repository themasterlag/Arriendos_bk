const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saldo_credito_pago', {
    id_saldo_credito_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_saldo_credito: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'saldo_credito',
        key: 'id_saldo_credito'
      }
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    valor_pago: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'saldo_credito_pago',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "saldo_credito_pago_pkey",
        unique: true,
        fields: [
          { name: "id_saldo_credito_pago" },
        ]
      },
    ]
  });
};
