const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('municipio', {
    id_municipio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    municipio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: " "
    },
    estado: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_departamento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      references: {
        model: 'departamento',
        key: 'id_departamento'
      }
    },
    id_dane: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'municipio',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "municipio_pkey",
        unique: true,
        fields: [
          { name: "id_municipio" },
        ]
      },
    ]
  });
};
