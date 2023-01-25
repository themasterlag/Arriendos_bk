const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entidad_bancaria', {
    id_entidad_bancaria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    entidad_bancaria: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'entidad_bancaria',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "entidad_bancaria_pkey",
        unique: true,
        fields: [
          { name: "id_entidad_bancaria" },
        ]
      },
    ]
  });
};
