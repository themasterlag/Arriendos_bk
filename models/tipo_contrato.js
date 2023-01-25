const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_contrato', {
    id_tipo_contrato: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_contrato: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_contrato',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "tipo_contrato_pkey",
        unique: true,
        fields: [
          { name: "id_tipo_contrato" },
        ]
      },
    ]
  });
};
