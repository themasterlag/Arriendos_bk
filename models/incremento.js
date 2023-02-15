const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('incremento', {
    id_incremento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    incremento: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    fecha_modificacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'incremento',
    schema: 'arriendos',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "incremento_pkey",
        unique: true,
        fields: [
          { name: "id_incremento" },
        ]
      },
    ]
  });
};
