const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_concepto', {
    id_tipo_concepto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_concepto: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_concepto',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "tipo_concepto_pkey",
        unique: true,
        fields: [
          { name: "id_tipo_concepto" },
        ]
      },
    ]
  });
};
