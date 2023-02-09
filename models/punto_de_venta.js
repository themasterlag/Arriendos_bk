const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('punto_de_venta', {
    id_punto_venta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'municipio',
        key: 'id_municipio'
      }
    },
    nombre_comercial: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area_local: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    microzona: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'microzona',
        key: 'id_microzona'
      }
    },
    sanitario: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    lavamanos: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    poceta: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    linea_vista: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    codigo_glpi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numero_ficha_catastral: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigo_citio_venta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_oficina: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_creacion_punto: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'punto_de_venta',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "punto_de_venta_pkey",
        unique: true,
        fields: [
          { name: "id_punto_venta" },
        ]
      },
    ]
  });
};
