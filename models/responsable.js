const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('responsable', {
    id_responsable: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "1"
    },
    iva: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    rete_iva: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    rete_fuente: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'responsable',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "responsable_pkey",
        unique: true,
        fields: [
          { name: "id_responsable" },
        ]
      },
    ]
  });
};
