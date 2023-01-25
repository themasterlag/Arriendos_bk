const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('liquidacion', {
    id_liquidacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    temporada: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_liquidacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    valor_total: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    estado: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'liquidacion',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "liquidacion_pkey",
        unique: true,
        fields: [
          { name: "id_liquidacion" },
        ]
      },
    ]
  });
};
