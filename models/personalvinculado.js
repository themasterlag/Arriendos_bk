const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const PersonalVinculado = sequelize.define(
    'personalvinculado',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      identificacion: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      cargo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      rh: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      fecha_actualizacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
      fecha_creacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_inactivacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'personalvinculado',
      schema: 'arriendos',
      timestamps: false,
      indexes: [
        {
          name: "personalvinculado_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ],
    }
  );

  // Definir un hook para ejecutar antes de cada actualización
  PersonalVinculado.beforeUpdate((instance, options) => {
    if (instance.changed('estado')) {
      if (instance.getDataValue('estado') === false) {
        instance.setDataValue('fecha_inactivacion', new Date());
      } else if (instance.getDataValue('estado') === true) {
        instance.setDataValue('fecha_inactivacion', null); // Establece la fecha_inactivacion en null
      }
    }
  });

  return PersonalVinculado;
};
