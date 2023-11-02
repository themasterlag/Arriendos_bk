const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cargo', {
    id_cargo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cargo',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "cargo_pkey",
        unique: true,
        fields: [
          { name: "id_cargo" },
        ]
      },
    ]
  });
};
