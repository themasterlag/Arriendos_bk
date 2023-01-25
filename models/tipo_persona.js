const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_persona', {
    id_tipo_persona: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomrbe_tipo_persona: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_persona',
    schema: 'arriendos',
    timestamps: false,
    indexes: [
      {
        name: "tipo_persona_pkey",
        unique: true,
        fields: [
          { name: "id_tipo_persona" },
        ]
      },
    ]
  });
};
