const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('responsabilidad', {
    id_responsabilidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    responsabilidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    porcentaje: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'responsabilidad',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "responsabilidad_pkey",
        unique: true,
        fields: [
          { name: "id_responsabilidad" },
        ]
      },
    ]
  });
};
