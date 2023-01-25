const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('factura_servicio', {
    id_factura_servicio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'factura_servicio',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "factura_servicio_pkey",
        unique: true,
        fields: [
          { name: "id_factura_servicio" },
        ]
      },
    ]
  });
};
