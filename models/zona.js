const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zona', {
    id_zona: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    zona: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zona',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "zona_pkey",
        unique: true,
        fields: [
          { name: "id_zona" },
        ]
      },
    ]
  });
};
