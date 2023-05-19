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
    },
    fecha_periodo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    codigo_verificacion: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    canon: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    administracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    defiicion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    poliza: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ipc: {
      type: DataTypes.REAL,
      allowNull: true
    },
    inc_adicional: {
      type: DataTypes.REAL,
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
