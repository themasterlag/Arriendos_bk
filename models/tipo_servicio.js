const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_servicio', {
    id_tipo_servicio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_servicio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_servicio',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "tipo_servicio_pkey",
        unique: true,
        fields: [
          { name: "id_tipo_servicio" },
        ]
      },
    ]
  });
};
