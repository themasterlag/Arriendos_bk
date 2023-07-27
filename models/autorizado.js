const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('autorizado', {
    id_autorizado: {
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
    metodo_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'metodo_pago',
        key: 'id_metodo_pago'
      }
    },
    entidad_bancaria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entidad_bancaria',
        key: 'id_entidad_bancaria'
      }
    },
    numero_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_tipo_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_cuenta',
        key: 'id_tipo_cuenta'
      }
    }
  }, {
    sequelize,
    tableName: 'autorizado',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "autorizado_pkey",
        unique: true,
        fields: [
          { name: "id_autorizado" },
        ]
      },
    ]
  });
};
