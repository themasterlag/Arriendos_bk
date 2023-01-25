const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propietario', {
    id_propietario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'propietario',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "arrendador_pkey",
        unique: true,
        fields: [
          { name: "id_propietario" },
        ]
      },
    ]
  });
};
