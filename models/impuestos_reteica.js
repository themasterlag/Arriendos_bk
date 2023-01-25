const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('impuestos_reteica', {
    id_impuesto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    impuesto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'municipio',
        key: 'id_municipio'
      }
    }
  }, {
    sequelize,
    tableName: 'impuestos_reteica',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "impuestos_pkey",
        unique: true,
        fields: [
          { name: "id_impuesto" },
        ]
      },
    ]
  });
};
