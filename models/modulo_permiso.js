const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modulo_permiso', {
    id_modulo_permiso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_modulo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'modulo',
        key: 'id_modulo'
      }
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'permiso',
        key: 'id_permiso'
      }
    }
  }, {
    sequelize,
    tableName: 'modulo_permiso',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "modulo_permiso_pkey",
        unique: true,
        fields: [
          { name: "id_modulo_permiso" },
        ]
      },
    ]
  });
};
