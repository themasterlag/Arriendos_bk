const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contrato_autorizado', {
    id_contrato_aut: {
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
    id_autorizado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'autorizado',
        key: 'id_autorizado'
      }
    },
    porcentaje: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contrato_autorizado',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "contrat_autorizado_pkey",
        unique: true,
        fields: [
          { name: "id_contrato_aut" },
        ]
      },
    ]
  });
};
