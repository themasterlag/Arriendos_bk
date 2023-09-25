const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persoanlvinculado', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      apellidos: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      identificacion: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rh: {
        type: DataTypes.STRING,
        allowNull: true
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
      }
  }, {
    sequelize,
    tableName: 'personalvinculado',
    schema: 'public',
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