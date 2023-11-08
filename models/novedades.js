const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('novedades',
    {
      id_novedad: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id_motivo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'motivo_novedades',
          key: 'id_motivo'
        }
      },
      tipo_pago: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'tipo_pago_novedades',
          key: 'id'
        }
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      correo_notificacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_personalvinculado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'personalvinculado',
          key: 'id'
        }
      },
      firma_vinculado: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      tipo_documento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'novedades',
      schema: 'arriendos',
      timestamps: false,
      indexes: [
        {
          name: 'novedades_pkey',
          unique: true,
          fields: [{ name: 'id_novedad' }],
        },
      ],
    }
  );
};
