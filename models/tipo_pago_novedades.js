const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_pago_novedades', {
    id: {
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
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_pago_novedades',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "tipo_pago_novedades_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
