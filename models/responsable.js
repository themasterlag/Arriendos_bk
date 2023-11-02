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
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'responsabilidad',
        key: 'id_responsabilidad'
      }
    },
    rete_iva: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'responsabilidad',
        key: 'id_responsabilidad'
      }
    },
    rete_fuente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'responsabilidad',
        key: 'id_responsabilidad'
      }
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
