const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_arriendo', {
    id_pago_arriendo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_contrato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contrato',
        key: 'id_contrato'
      }
    },
    canon: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    iva: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rete_iva: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rete_fuente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reteica: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bomberil: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valor_total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_liquidacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago_arriendo',
    schema: 'arriendos',
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
