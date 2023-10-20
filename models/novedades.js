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
      },
      tipo_pago: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
