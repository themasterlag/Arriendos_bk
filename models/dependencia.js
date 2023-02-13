const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dependencia', {
    id_dependencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dependencia: {
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
    tableName: 'dependencia',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "dependencia_pkey",
        unique: true,
        fields: [
          { name: "id_dependencia" },
        ]
      },
    ]
  });
};
