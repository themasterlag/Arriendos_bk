const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subproceso', {
    id_subproceso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subproceso: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_proceso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proceso',
        key: 'id_proceso'
      }
    }
  }, {
    sequelize,
    tableName: 'subproceso',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "subproceso_pkey",
        unique: true,
        fields: [
          { name: "id_subproceso" },
        ]
      },
    ]
  });
};
