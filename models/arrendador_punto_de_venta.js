const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arrendador_punto_de_venta', {
    id_pdv_arrendador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_arrendador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'arrendador',
        key: 'id_arrendador'
      }
    },
    id_punto_de_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'punto_de_venta',
        key: 'id_punto_venta'
      }
    }
  }, {
    sequelize,
    tableName: 'arrendador_punto_de_venta',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "arrendador_contrato_pkey",
        unique: true,
        fields: [
          { name: "id_pdv_arrendador" },
        ]
      },
    ]
  });
};
