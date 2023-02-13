const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_permiso', {
    id_usuario_permiso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
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
    tableName: 'usuario_permiso',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "usuario_permiso_pkey",
        unique: true,
        fields: [
          { name: "id_usuario_permiso" },
        ]
      },
    ]
  });
};
