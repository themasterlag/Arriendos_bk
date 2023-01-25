const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proceso', {
    id_proceso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_proceso: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proceso',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "proceso_pkey",
        unique: true,
        fields: [
          { name: "id_proceso" },
        ]
      },
    ]
  });
};
