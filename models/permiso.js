const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permiso', {
    id_permiso: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    permiso: {
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
    tableName: 'permiso',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "permiso_pkey",
        unique: true,
        fields: [
          { name: "id_permiso" },
        ]
      },
    ]
  });
};
