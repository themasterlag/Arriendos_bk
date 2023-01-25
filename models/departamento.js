const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamento', {
    id_departamento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'departamento',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "departamento_pkey",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};
