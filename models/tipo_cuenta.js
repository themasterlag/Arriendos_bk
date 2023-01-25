const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_cuenta', {
    id_tipo_cuenta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_cuenta: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_cuenta',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "tipo_cuenta_pkey",
        unique: true,
        fields: [
          { name: "id_tipo_cuenta" },
        ]
      },
    ]
  });
};
