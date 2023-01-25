const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('periodo', {
    id_periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'periodo',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "periodo_pkey",
        unique: true,
        fields: [
          { name: "id_periodo" },
        ]
      },
    ]
  });
};
