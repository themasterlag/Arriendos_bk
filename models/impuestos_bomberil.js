const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('impuestos_bomberil', {
    id_impuesto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    impuesto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tipo_bomberil: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'municipio',
        key: 'id_municipio'
      }
    }
  }, {
    sequelize,
    tableName: 'impuestos_bomberil',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "impuestos_bomberil_pkey",
        unique: true,
        fields: [
          { name: "id_impuesto" },
        ]
      },
    ]
  });
};
