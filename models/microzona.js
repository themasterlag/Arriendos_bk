const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('microzona', {
    id_microzona: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    microzona: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_zona: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'zona',
        key: 'id_zona'
      }
    }
  }, {
    sequelize,
    tableName: 'microzona',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "microzona_pkey",
        unique: true,
        fields: [
          { name: "id_microzona" },
        ]
      },
    ]
  });
};
