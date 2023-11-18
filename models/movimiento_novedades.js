const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('movimiento_novedades',
    {
      id_movimiento_novedad: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_novedad: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'novedades',
          key: 'id_novedad'
        }
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        }
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firma_aprobador: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      orden: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'movimiento_novedades',
      schema: 'arriendos',
      timestamps: false,
      indexes: [
        {
          name: 'movimiento_novedades_pkey',
          unique: true,
          fields: [{ name: 'id_movimiento_novedad' }],
        },
      ],
    }
  );
};
