const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rolid_rol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rol',
        key: 'id_rol'
      }
    },
    nombres: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dependencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dependencia',
        key: 'id_dependencia'
      }
    },
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    proceso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proceso',
        key: 'id_proceso'
      }
    },
    subproceso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subproceso',
        key: 'id_subproceso'
      }
    },
    numero_documento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sexo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    id_cargo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cargo',
        key: 'id_cargo'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "usuario_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
