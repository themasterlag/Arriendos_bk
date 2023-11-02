const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('incremento_contrato', {
    id_incremento_contrato: {
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
    fecha_incremento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    valor_incremento: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'incremento_contrato',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "incremento_contrato_pkey",
        unique: true,
        fields: [
          { name: "id_incremento_contrato" },
        ]
      },
    ]
  });
};
