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
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Estados: pendiente, liquidado, pagado"
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fecha_modificacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_liquidacion: {
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
