const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permiso_detalle', {
    id_permiso_detalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'permiso',
        key: 'id_permiso'
      }
    },
    id_cargo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cargo',
        key: 'id_cargo'
      }
    },
    id_subproceso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subproceso',
        key: 'id_subproceso'
      }
    }
  }, {
    sequelize,
    tableName: 'permiso_detalle',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "permiso_detalle_pkey",
        unique: true,
        fields: [
          { name: "id_permiso_detalle" },
        ]
      },
    ]
  });
};
