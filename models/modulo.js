const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modulo', {
    id_modulo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    modulo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'modulo',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "modulo_pkey",
        unique: true,
        fields: [
          { name: "id_modulo" },
        ]
      },
    ]
  });
};
