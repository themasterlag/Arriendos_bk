const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('motivo_novedades', {
    id_motivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'motivo_novedades',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "motivo_novedades_pkey",
        unique: true,
        fields: [
          { name: "id_motivo" },
        ]
      },
    ]
  });
};
