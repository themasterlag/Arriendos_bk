const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propietario_punto_venta', {
    id_propietario_punto_venta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_propietario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    },
    id_punto_venta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'punto_de_venta',
        key: 'id_punto_venta'
      }
    }
  }, {
    sequelize,
    tableName: 'propietario_punto_venta',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "propietario_punto_venta_pkey",
        unique: true,
        fields: [
          { name: "id_propietario_punto_venta" },
        ]
      },
    ]
  });
};
