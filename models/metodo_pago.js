const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metodo_pago', {
    id_metodo_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'metodo_pago',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "metodo_pago_pkey",
        unique: true,
        fields: [
          { name: "id_metodo_pago" },
        ]
      },
    ]
  });
};
