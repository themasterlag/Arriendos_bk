const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personalvinculado', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      identificacion: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      cargo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      rh: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
  }, {
    sequelize,
    tableName: 'personalvinculado',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "personalvinculado_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};