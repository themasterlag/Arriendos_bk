const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_servicios', {
    id_pago_servicios: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'pago_servicios',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "pago_servicios_pkey",
        unique: true,
        fields: [
          { name: "id_pago_servicios" },
        ]
      },
    ]
  });
};
