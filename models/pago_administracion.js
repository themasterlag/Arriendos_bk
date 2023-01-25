const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_administracion', {
    id_pago_administracion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'periodo',
        key: 'id_periodo'
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
    id_contrato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contrato',
        key: 'id_contrato'
      }
    }
  }, {
    sequelize,
    tableName: 'pago_administracion',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "pago_administracion_pkey",
        unique: true,
        fields: [
          { name: "id_pago_administracion" },
        ]
      },
    ]
  });
};
